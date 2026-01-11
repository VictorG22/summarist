"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Modal form types
export type ModalFormType = "login" | "signup" | "forgot";

// Context interface
interface AuthModalContextProps {
  isOpen: boolean;
  currentForm: ModalFormType;
  openModal: (form?: ModalFormType) => void;
  closeModal: () => void;
  switchForm: (form: ModalFormType) => void;
}

// Create context with default values
const AuthModalContext = createContext<AuthModalContextProps | undefined>(
  undefined
);

// Provider component
export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState<ModalFormType>("login");

  // Open modal and optionally set form type
  const openModal = (form?: ModalFormType) => {
    if (form) setCurrentForm(form);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Switch form type without closing
  const switchForm = (form: ModalFormType) => setCurrentForm(form);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, currentForm, openModal, closeModal, switchForm }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

// Hook for easy access
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};
