"use client";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useAuth } from "@/app/context/AuthContext";
import LoggedOutState from "@/app/components/UI/LoggedOutState";
import { useGuest } from "@/app/context/GuestContext";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/app/context/AuthModalContext";

export default function Settings() {
  const { user, membership, loading } = useAuth();
  const { guestUser } = useGuest();
  const { openModal } = useAuthModal();
  const router = useRouter();

  if (loading) {
    return (
      <main className="max-w-290 w-full mx-auto px-6 pt-10">
        <p className="text-center text-[#032b41]">Loading...</p>
      </main>
    );
  }

  const handleUpgradeClick = () => {
    if (guestUser?.isGuest && !user) {
      openModal("signup");
      return;
    }

    router.push("/choose-plan");
  };

  return (
    <div>
      <main className="max-w-290 w-full mx-auto px-6 overflow-y-auto">
        <div className="pt-10 w-full">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
            Settings
          </h1>

          {user || guestUser ? (
            <>
              {/* Subscription Plan */}
              <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                Your Subscription Plan
                <p className="font-normal flex items-center gap-2 mt-2">
                  {guestUser ? (
                    "Guest"
                  ) : membership === "basic" ? (
                    "Basic"
                  ) : membership === "premium" ? (
                    <>
                      Premium <BsFillStarFill color="gold" />
                    </>
                  ) : membership === "premium-plus" ? (
                    <>
                      Premium + <BsFillStarFill color="gold" />{" "}
                      <BsFillStarFill color="gold" />
                    </>
                  ) : (
                    "Error — please contact support"
                  )}
                </p>
                {membership !== "premium" && membership !== "premium-plus" && (
                  <div className="mt-4 inline-block">
                    <div
                      onClick={handleUpgradeClick}
                      className="bg-[#2bd97c] font-normal cursor-pointer px-4 py-2 rounded-sm transition duration-200 hover:bg-[#27c46b]"
                    >
                      {guestUser
                        ? "Create an Account"
                        : membership === "basic"
                          ? "Basic"
                          : ""}
                    </div>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                Email
                <p className="font-normal overflow-x-auto mt-2">
                  {user ? user.email : "Guest"}
                </p>
              </div>
            </>
          ) : (
            // Logged-out view
            <LoggedOutState pageTitle="details" />
          )}
        </div>
      </main>
    </div>
  );
}
