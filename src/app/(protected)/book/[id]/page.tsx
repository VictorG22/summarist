"use client";

import { useAuth } from "@/app/context/AuthContext";
import { formatTime } from "@/app/utils/formatTime";
import { useBookAccess } from "@/hooks/useBookAccess";
import { useGetBookByIdQuery } from "@/services/books";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiBookmark, BiMicrophone, BiStar } from "react-icons/bi";
import { BsClock, BsFillBookmarkFill } from "react-icons/bs";
import { GiLightBulb, GiOpenBook } from "react-icons/gi";

export default function BookDescription() {
  const params = useParams();
  const bookId = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const { membership } = useAuth();

  const { handleBookClick } = useBookAccess();

  const { data } = useGetBookByIdQuery(bookId);
  const [duration, setDuration] = useState(0);


  useEffect(() => {
    if (!data?.audioLink) return;

    const audio = new Audio(data.audioLink);

    // Load metadata to get duration
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    // Cleanup
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [data?.audioLink]);

  return (
    <div>
      <main className="max-w-290 w-full mx-auto px-6">
        <div className="pt-10 w-full">
          <div className="mb-6">
            {data ? (
              <>
                <div className="flex max-lg:flex-col-reverse gap-4">
                  <div className="flex flex-col">
                    <div className="mb-6 text-[#032b41] border-b border-gray-300 pb-4 flex flex-col gap-y-4">
                      <h1 className="text-4xl font-bold">
                        {data.title}{" "}
                        {data.subscriptionRequired && membership === 'basic' && "(Premium)"}{" "}
                      </h1>
                      <h3 className="text-lg font-bold">{data.author}</h3>
                      <h2 className="font-light text-xl">{data.subTitle}</h2>
                    </div>
                    <div className="font-semibold mb-6 text-[#032b41] border-b border-gray-300 pb-4 flex flex-col gap-y-4">
                      <div className="max-w-100">
                        <div className="flex items-center justify-start mb-4">
                          <div className="flex items-center mr-1 w-[50%] gap-1 max-w-50 pr-auto">
                            <BiStar className="w-6 h-6" />
                            <p>{data.averageRating}</p>
                            <p>{`(${data.totalRating} ratings)`}</p>
                          </div>
                          <div className="flex items-center gap-1 ">
                            <BsClock className="w-6 h-6" />
                            <p>{formatTime(duration)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-start">
                          <div className="flex items-center mr-1 w-[50%] gap-1 max-w-50">
                            <BiMicrophone className="w-6 h-6" />
                            <p>{data.type}</p>
                          </div>
                          <div className="flex items-center w-[50%] gap-1 ">
                            <GiLightBulb className="w-6 h-6" />
                            <p>{`${data.keyIdeas} Key Ideas`}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                      <div
                        onClick={() => handleBookClick(data)}
                        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition duration-200"
                      >
                        <div className="h-12 w-36 bg-[#032b41] rounded-md flex items-center justify-center gap-2">
                          <GiOpenBook color="white" />
                          <p className="text-white text-lg">Read</p>
                        </div>
                      </div>
                      <div
                        onClick={() => handleBookClick(data)}
                        className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition duration-200"
                      >
                        <div className="h-12 w-36 bg-[#032b41] rounded-md flex items-center justify-center gap-2">
                          <BiMicrophone color="white" />
                          <p className="text-white text-lg">Listen</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-10 cursor-not-allowed">
                      <BiBookmark color="blue" />
                      <p className="text-lg text-[#0000ff] font-semibold">
                        Saved in My Library
                      </p>
                    </div>

                    <div className="text-[#032b41] mb-6">
                      <h3 className="text-xl font-semibold mb-4">{`What's it about?`}</h3>
                      <div className="flex items-center gap-x-5">
                        {data.tags.map((tag) => (
                          <div
                            key={tag}
                            className="bg-[#f1f6f4] font-semibold p-4 rounded-sm cursor-not-allowed"
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-[#032b41] tracking-tight leading-6">
                        {data.bookDescription}
                      </p>
                    </div>

                    <div className="mb-6 text-[#032b41]">
                      <h2 className="text-lg font-bold mb-4">
                        About the author
                      </h2>
                      <p className="text-[#032b41] tracking-tight leading-6">
                        {data.authorDescription}
                      </p>
                    </div>
                  </div>
                  <figure className="min-w-75 w-75 h-75 mx-auto">
                    <Image
                      src={data.imageLink}
                      alt={`${data.title} Cover`}
                      width={300}
                      height={300}
                    />
                  </figure>
                </div>
              </>
            ) : (
              <>
                <div className="pt-10 w-full animate-pulse">
                  <div className="flex max-lg:flex-col-reverse gap-6">
                    <div className="flex flex-col flex-1">
                      <div className="mb-6 border-b border-gray-300 pb-4 space-y-4">
                        <div className="h-10 w-3/4 bg-gray-200 rounded" />
                        <div className="h-5 w-1/3 bg-gray-200 rounded" />
                        <div className="h-6 w-2/3 bg-gray-200 rounded" />
                      </div>

                      <div className="mb-6 border-b border-gray-300 pb-4 space-y-4">
                        <div className="flex gap-6">
                          <div className="h-5 w-40 bg-gray-200 rounded" />
                          <div className="h-5 w-32 bg-gray-200 rounded" />
                        </div>
                        <div className="flex gap-6">
                          <div className="h-5 w-40 bg-gray-200 rounded" />
                          <div className="h-5 w-32 bg-gray-200 rounded" />
                        </div>
                      </div>

                      <div className="flex gap-4 mb-6">
                        <div className="h-12 w-36 bg-gray-300 rounded-md" />
                        <div className="h-12 w-36 bg-gray-300 rounded-md" />
                      </div>

                      <div className="h-5 w-48 bg-gray-200 rounded mb-10" />

                      <div className="mb-6 space-y-4">
                        <div className="h-6 w-40 bg-gray-200 rounded" />
                        <div className="flex gap-4">
                          <div className="h-12 w-24 bg-gray-200 rounded" />
                          <div className="h-12 w-24 bg-gray-200 rounded" />
                          <div className="h-12 w-24 bg-gray-200 rounded" />
                        </div>
                      </div>

                      <div className="mb-6 space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      </div>

                      <div className="space-y-4">
                        <div className="h-6 w-48 bg-gray-200 rounded" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                        <div className="h-4 w-5/6 bg-gray-200 rounded" />
                      </div>
                    </div>

                    <div className="min-w-75 w-75 h-75 bg-gray-300 rounded mx-auto" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
