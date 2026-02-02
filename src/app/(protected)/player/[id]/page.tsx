"use client";
import { useTextSize } from "@/app/context/TextSizeContext";
import { useGetBookByIdQuery } from "@/services/books";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { useEffect } from "react";
import { useGuest } from "@/app/context/GuestContext";

export default function PlayerPage() {
  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");

  const { data, error, isLoading } = useGetBookByIdQuery(bookId);

  const router = useRouter();
  const { user } = useAuth();
  const { guestUser } = useGuest();
  const { openModal } = useAuthModal();

  const { textSize } = useTextSize();

  useEffect(() => {
    // If the user becomes null (logs out), redirect and open modal
    if (!user || guestUser) {
      router.push("/for-you");
      openModal();
    }
  }, [user, router, openModal]);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-6 overflow-y-auto">
        <div className=" max-w-200 mx-auto pt-10 h-[calc(100vh-169px)] max-md:h-[calc(100vh-281px)]">
          {data ? (
            <>
              <h1 className="text-2xl font-bold pb-6 mb-6 text-[#032b41] border-b border-gray-300">
                {data.title}
              </h1>
              <p
                className="whitespace-pre-line text-[#032b41] leading-relaxed"
                style={{ fontSize: `${textSize}px` }}
              >
                {data.summary}
              </p>
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </div>
  );
}
