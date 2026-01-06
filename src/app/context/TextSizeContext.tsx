"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface TextSizeContextProps {
  textSize: number; 
  setTextSize: (size: number) => void;
}

const TextSizeContext = createContext<TextSizeContextProps | undefined>(undefined);

export function TextSizeProvider({ children }: { children: ReactNode }) {
  const [textSize, setTextSize] = useState(16);

  return (
    <TextSizeContext.Provider value={{ textSize, setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  const context = useContext(TextSizeContext);
  if (!context) throw new Error("useTextSize must be used within a TextSizeProvider");
  return context;
}
