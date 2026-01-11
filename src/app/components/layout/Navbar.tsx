"use client";
import { useAuthModal } from "@/app/context/AuthModalContext";
import Image from "next/image";

export default function Navbar() {
  const { openModal } = useAuthModal();
  return (
    <nav className="h-20">
      <div className="flex justify-between items-center max-w-267.5 w-full h-full mx-auto px-6">
        <figure className="max-w-50">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={80}
            className="w-full h-full"
          />
        </figure>
        <ul className="flex gap-6">
          <li
            onClick={() => openModal("login")}
            className="cursor-pointer text-[#032b41] hover:text-[#2bd97c] transition"
          >
            Login
          </li>
          <li className="hidden sm:block cursor-not-allowed text-[#032b41]">
            About
          </li>
          <li className="hidden sm:block cursor-not-allowed text-[#032b41]">
            Contact
          </li>
          <li className="hidden sm:block cursor-not-allowed text-[#032b41]">
            Help
          </li>
        </ul>
      </div>
    </nav>
  );
}
