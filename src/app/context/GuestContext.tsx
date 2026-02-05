"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface GuestUser {
  name: string;
  membership: "basic";
  isGuest: true;
}

interface GuestContextType {
  guestUser: GuestUser | null;
  setGuestUser: (user: GuestUser | null) => void;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

export const GuestProvider = ({ children }: { children: ReactNode }) => {
  const [guestUser, setGuestUser] = useState<GuestUser | null>(null);

  return (
    <GuestContext.Provider value={{ guestUser , setGuestUser }}>
      {children}
    </GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) throw new Error("useGuest must be used within GuestProvider");
  return context;
};
