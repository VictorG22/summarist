"use client";

import BookList from "@/app/components/books/BookList";
import { useGetBookByStatusQuery } from "@/services/books";
import Image from "next/image";
import Link from "next/link";
import { GiPlayButton } from "react-icons/gi";

export function SelectedBook() {
  const { data, error, isLoading } = useGetBookByStatusQuery("selected");
  console.log(data);

  return (
    <>
      {data ? (
        <Link
          href={`/book/${data[0].id}`}
          className="bg-[#fbefd6] flex gap-6 roudned-sm p-6 max-w-200 "
        >
          <div className="w-[40%]">
            <p>{data[0].subTitle}</p>
          </div>
          <div className="w-px bg-gray-300"></div>
          <div className="flex">
            <Image
              src={data[0].imageLink}
              alt={`Cover of ${data[0].title}`}
              width={150}
              height={75}
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{data[0].title}</h2>
            <h3 className="text-md ">{data[0].author}</h3>
            <div className="flex items-center gap-2 mt-4">
              <div className="bg-black rounded-full p-2">
                <GiPlayButton className="invert w-6 h-6" />
              </div>
              <p>{`${3} mins ${23} secs`}</p>
            </div>
          </div>
        </Link>
      ) : (
        <>Loading ma g.</>
      )}
    </>
  );
}

export default function ForYou() {

  return (
    <div>
      <main className="max-w-290 w-full mx-auto px-6">
        <div className="pt-10 w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6 text-[#032b41]">
              Selected just for you
            </h1>
            <SelectedBook />
          </div>
          <BookList status={'recommended'} title={"Recommended Books"} subTitle={"We think you'll like these"} />
          <BookList status={'suggested'} title={"Suggested Books"} subTitle={"Browse those books"} />
        </div>
      </main>
    </div>
  );
}
