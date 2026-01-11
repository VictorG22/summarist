"use client";

import BookCard from "./BookCard";
import { useGetBookByStatusQuery } from "@/services/books";

export default function BookList({
  status,
  title,
  subTitle,
}: {
  status: string;
  title: string;
  subTitle: string;
}) {
  const { data, error, isLoading } = useGetBookByStatusQuery(status);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#032b41]">{title}</h1>
        <p className="font-thin mb-2">{subTitle}</p>
        <div className="flex overflow-x-auto gap-4 mb-8">
          {data ? (
            <>
              {data.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          ) : (
            <div>
              <div className="h-7 w-48 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="h-4 w-72 bg-gray-200 rounded mb-6 animate-pulse" />

              <div className="flex gap-4 overflow-x-auto mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col w-50 px-3 pb-3 py-8 shrink-0 gap-3"
                  >
                    <div className="w-43 h-43 bg-gray-200 rounded animate-pulse" />

                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-44 bg-gray-200 rounded animate-pulse" />

                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-3 w-10 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 w-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
