"use client";

import Image from "next/image";
import { BiUser } from "react-icons/bi";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useState, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useGuest } from "@/app/context/GuestContext";
import { useAuthModal } from "@/app/context/AuthModalContext";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export default function AuthModal() {
  const { user } = useAuth();
  const { guestUser, setGuestUser } = useGuest();
  const { isOpen, currentForm, closeModal, switchForm } = useAuthModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Close modal on click outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  // Helper for Firebase errors
  const handleAuthError = (error: unknown) => {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("User not found.");
          return;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          return;
        case "auth/email-already-in-use":
          toast.error("Email already in use.");
          return;
        case "auth/popup-closed-by-user":
          toast.error("Sign-in popup was closed.");
          return;
        default:
          toast.error(error.message);
          return;
      }
    }
    if (error instanceof Error) {
      toast.error(error.message);
      return;
    }
    toast.error("Something went wrong.");
  };

  // Firebase handlers
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Create the auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const newUser = userCredential.user;

      // 2️⃣ Create Firestore doc
      await setDoc(doc(db, "users", newUser.uid), {
        uid: newUser.uid,
        email: newUser.email,
        membership: "basic",
        createdAt: serverTimestamp(),
      });

      toast.success("Account created successfully 🎉");

      // 3️⃣ Clear inputs & close modal
      setEmail("");
      setPassword("");
      setGuestUser(null);
      closeModal();
    } catch (err: unknown) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully ✅");
      setEmail("");
      setPassword("");
      setGuestUser(null);
      closeModal();
    } catch (err: unknown) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent ✅");
    } catch (err: unknown) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google ✅");
      setGuestUser(null);
      closeModal();
    } catch (err: unknown) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/60 z-1000 transition-opacity duration-300"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-sm shadow-2xl max-w-md w-full p-6 flex flex-col gap-4 transform scale-95 opacity-0 transition-all duration-300 animate-modalIn"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          {currentForm === "login"
            ? "Log in to Summarist"
            : currentForm === "signup"
              ? "Sign up to Summarist"
              : "Reset Password"}
        </h1>

        {/* Guest info */}
        {guestUser && !user && (
          <p className="text-center text-sm text-gray-700 mb-2">
            Signed in as: {guestUser.name}
          </p>
        )}

        {/* Continue as Guest button */}
        {!user && !guestUser && currentForm === "login" && (
          <button
            onClick={() => {
              setGuestUser({
                name: "Guest",
                membership: "basic",
                isGuest: true,
              });
              closeModal();
            }}
            className="relative w-full h-10 rounded-sm bg-blue-800 text-white flex items-center justify-center hover:bg-blue-700 transition duration-200 mb-4"
          >
            <BiUser className="absolute left-2 w-6 h-6" />
            Continue as Guest
          </button>
        )}

        {/* Google login */}
        {!user && (
          <button
            onClick={handleGoogleLogin}
            className="relative w-full h-10 rounded-sm bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition duration-200 mb-4"
          >
            <Image
              width={36}
              height={36}
              src="/google.png"
              alt=""
              className="absolute left-2 p-1 bg-white rounded-sm"
            />
            Continue with Google
          </button>
        )}

        {/* Divider */}
        {!user && (
          <div className="flex items-center gap-2 my-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>
        )}

        {/* Forms */}
        {!user && (
          <form
            onSubmit={
              currentForm === "login"
                ? handleLogin
                : currentForm === "signup"
                  ? handleSignup
                  : handleForgotPassword
            }
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-sm px-3 h-10 outline-none focus:border-green-400"
            />
            {(currentForm === "login" || currentForm === "signup") && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-gray-300 rounded-sm px-3 h-10 outline-none focus:border-green-400"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-green-400 text-white h-10 rounded-sm mt-2 hover:bg-green-500 transition duration-200"
            >
              {loading
                ? "Processing..."
                : currentForm === "login"
                  ? "Login"
                  : currentForm === "signup"
                    ? "Sign Up"
                    : "Reset Password"}
            </button>
          </form>
        )}

        {/* Switch forms */}
        {!user && (
          <>
            {currentForm === "login" ? (
              <div className="flex mt-2">
                <button
                  onClick={() => switchForm("signup")}
                  className="flex-1 h-10 bg-gray-100 hover:bg-gray-200 transition duration-200 text-blue-700 rounded-sm"
                >
                  {"Don't have an account?"}
                </button>
                <button
                  onClick={() => switchForm("forgot")}
                  className="flex-1 h-10 bg-gray-100 hover:bg-gray-200 transition duration-200 text-blue-700 rounded-sm ml-2"
                >
                  Forgot Password?
                </button>
              </div>
            ) : (
              <button
                onClick={() => switchForm("login")}
                className="w-full h-10 bg-gray-100 text-blue-700 hover:bg-gray-200 transition duration-200 rounded-sm mt-2"
              >
                {currentForm === "signup"
                  ? "Already have an account?"
                  : "Back to login"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
