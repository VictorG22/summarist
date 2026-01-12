"use client";

import { Book } from "@/app/types/Book";
import Image from "next/image";
import Link from "next/link";
import { BiStar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { useEffect, useState } from "react";
import { formatTime } from "@/app/utils/formatTime";
import { useAuth } from "@/app/context/AuthContext";

export default function BookCard({ book }: { book: Book }) {
  const [duration, setDuration] = useState<number | null>(null);
  const { membership } = useAuth();
  

  useEffect(() => {
    if (!book.audioLink) return;

    const audio = new Audio();
    audio.preload = "metadata";
    audio.src = book.audioLink;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [book.audioLink]);

  return (
    <Link
      href={`/book/${book.id}`}
      className="relative flex flex-col w-50 px-3 pb-3 py-8 shrink-0 text-[#032b41] gap-2 transition duration-100 hover:bg-gray-100"
    >
      <Image
        width={172}
        height={172}
        src={book.imageLink}
        alt={book.title}
      />

      <h3 className="font-bold leading-tight">{book.title}</h3>
      <p className="text-gray-400 text-sm">{book.author}</p>
      <p className="text-black leading-tight text-md">{book.subTitle}</p>

      <div className="flex items-center gap-1 text-gray-500 text-sm">
        <BsClock />
        <p>{duration ? formatTime(duration) : "--:--"}</p>

        <BiStar className="ml-2" />
        <p>{book.averageRating}</p>
      </div>
      {book.subscriptionRequired && membership === 'basic' && <div className="absolute right-0 top-0 bg-[#032b41] rounded-full text-white px-1 py-px text-[12px]">Premium</div>}
    </Link>
  );
}
