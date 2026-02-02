"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { Book } from "@/app/types/Book";
import { useGuest } from "@/app/context/GuestContext";

export function useBookAccess() {
  const { user, membership, loading } = useAuth();
  const { guestUser } = useGuest();
  const { openModal } = useAuthModal();
  const router = useRouter();

  const handleBookClick = (book: Book) => {
    if (loading) return;

    if (guestUser?.isGuest || !user) {
      openModal("signup");
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
