import { Book } from "@/app/types/Book";
import Image from "next/image";
import Link from "next/link";
import { BiStar } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      key={book.title}
      className="flex flex-col w-50 px-3 pb-3 py-8 shrink-0 text-[#032b41] gap-2 transition duration-100 hover:bg-gray-100"
    >
      <Image width={172} height={172} src={book.imageLink} alt={`book.title`} />
      <h3 className="font-bold leading-tight">{book.title}</h3>
      <p className="text-gray-400 text-sm">{book.author}</p>
      <p className="text-black leading-tight text-md">{book.subTitle}</p>
      <div className="flex items-center gap-1 text-gray-500 text-sm">
        <BsClock className="" />
        <p>03:24</p>
        <BiStar className="ml-2" />
        <p>4.4</p>
      </div>
    </Link>
  );
}
