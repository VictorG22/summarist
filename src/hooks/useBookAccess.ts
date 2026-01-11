"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { Book } from "@/app/types/Book";

export function useBookAccess() {
  const router = useRouter();
  const { user, membership, loading } = useAuth();
  const { openModal } = useAuthModal();

  const handleBookClick = (book: Book) => {
    if (loading) return;

    if (!user) {
      openModal("login");
      return;
    }

    if (book.subscriptionRequired && membership === "basic") {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${book.id}`);
  };

  return { handleBookClick };
}
