"use client";
import { useState } from "react";

export default function Accordion({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2 border-b border-gray-300 mt-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full my-2 text-start"
      >
        <span className="font-semibold text-xl md:text-2xl text-[#032b41]">
          {title}
        </span>
        <div>
          <svg
            className={`w-8 h-8 transition duration-300
            ${accordionOpen ? "-rotate-90" : "rotate-90"}
            `}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>
      <div
        className={`grid mb-2 overflow-hidden transition-all duration-300 ease-in-out text-slate-600
        ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="pt-2 text-sm md:text-base overflow-hidden tracking-tight">
          {paragraph}
        </div>
      </div>
    </div>
  );
}
