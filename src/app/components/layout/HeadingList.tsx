'use client';

import { useState, useEffect } from 'react';

export default function HeadingList({headings}: {headings: string[]}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % headings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {headings.map((heading, index) => (
        <div
          key={index}
          className={`font-medium text-xl sm:text-[32px] ${index === activeIndex ? 'text-[#2bd97c]' : 'text-[#6b757b]'}`}
        >
          {heading}
        </div>
      ))}
    </div>
  );
}
