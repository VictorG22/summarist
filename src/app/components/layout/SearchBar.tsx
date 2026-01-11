"use client";

import { FaBars } from "react-icons/fa6";
import { useSidebar } from "../../context/SidebarContext";
import { BiSearchAlt2 } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useGetBookByAuthorOrTitleQuery } from "@/services/books";
import { BsClock } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";
import { formatTime } from "@/app/utils/formatTime";

export default function SearchBar() {
  const pathname = usePathname();
  const { openSidebar } = useSidebar();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [durations, setDurations] = useState<Record<string, string>>({});
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery("");
      setDebouncedQuery("");
      setLocalLoading(false);
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setLocalLoading(false);
      setDebouncedQuery("");
    } else {
      setLocalLoading(true);
    }
  };

  const {
    data: searchResults = [],
    isFetching,
    error,
  } = useGetBookByAuthorOrTitleQuery(debouncedQuery, {
    skip: debouncedQuery === "",
  });

  useEffect(() => {
    if (!isFetching) {
      const timer = setTimeout(() => {
        setLocalLoading(false);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [isFetching]);


  useEffect(() => {
    const newDurations: Record<string, string> = {};
    searchResults.forEach((book) => {
      if (book.audioLink) {
        const audio = new Audio(book.audioLink);
        audio.addEventListener("loadedmetadata", () => {
          newDurations[book.id] = formatTime(audio.duration);
          setDurations((prev) => ({ ...prev, ...newDurations }));
        });
      }
    });
  }, [searchResults]);

  return (
    <div className="border-b border-gray-200 relative z-1000">
      <div className="relative flex items-center py-6 pl-6 px-2 max-w-225 mx-auto gap-2">
        <form
          className="ml-auto flex flex-1 min-w-0 max-w-75 h-10 px-3 border-2 border-[#e1e7ea] rounded-md bg-[#f1f6f4]"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search for books"
            className="flex-1 min-w-0 bg-transparent focus:outline-none"
            value={query}
            onChange={handleInputChange}
          />

          <button
            type="button"
            className="border-l-2 border-gray-200 pl-3 h-full flex items-center cursor-pointer"
            onClick={() => {
              setQuery(""); 
              setLocalLoading(false);
              setDebouncedQuery("");
            }}
          >
            {query ? (
              <CgClose className="w-6 h-6 text-[#032b41]"/>
            ) : (
              <BiSearchAlt2 className="w-6 h-6 text-[#032b41]" />
            )}
          </button>
        </form>

        <button
          onClick={openSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 shrink-0"
        >
          <FaBars className="w-6 h-6" />
        </button>

        {debouncedQuery && (
          <div className="absolute top-full right-0 w-full max-w-115 mx-auto mt-2 p-4 bg-white border border-gray-200 shadow-2xl rounded-md overflow-y-auto max-h-125 z-1100">
            {localLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="p-4 flex gap-4 border-b border-gray-300 last:border-b-0 animate-pulse"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-md" />
                  <div className="flex flex-col justify-center gap-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-10 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              ))
            ) : searchResults.length > 0 ? (
              searchResults.map((book) => (
                <Link
                  href={`/book/${book.id}`}
                  key={book.id}
                  className="p-4 flex gap-4 hover:bg-gray-100 cursor-pointer border-b border-gray-300 last:border-b-0"
                >
                  <Image
                    alt={`${book.title}`}
                    src={book.imageLink}
                    width={80}
                    height={80}
                    className="my-auto"
                  />
                  <div className="flex flex-col justify-center gap-1">
                    <p className="font-bold text-[#032b41] tracking-tight">
                      {book.title}
                    </p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <BsClock />
                      <p>{durations[book.id] ?? "0:00"}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : error ? (
              <p className="bg-red-100 text-red-500 text-center p-4">
                Something went wrong. Please try again.
              </p>
             ) : (
              <p className="text-gray-500 text-center py-4">
                No results found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
