'use client'

import BookCard from "./BookCard";
import { useGetBookByStatusQuery } from "@/services/books";

export default function BookList({status, title, subTitle}: {status: string, title: string, subTitle: string }) {
  const { data, error, isLoading } = useGetBookByStatusQuery(status);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4 text-[#032b41]">
          {title}
        </h1>
        <p className="font-thin mb-2">{subTitle}</p>
        <div className="flex overflow-x-auto gap-4 mb-8">
          {data ? (
            <>
              {data.slice(0, 5).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </>
          ) : (
            <>is loading big dawg</>
          )}
        </div>
      </div>
    </>
  );
}
