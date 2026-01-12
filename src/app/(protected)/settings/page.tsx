"use client";
import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useAuth } from "@/app/context/AuthContext";
import LoggedOutState from "@/app/components/UI/LoggedOutState";
import Link from "next/link";

export default function Settings() {
  const { user, email, membership, loading } = useAuth();

  if (loading) {
    return (
      <main className="max-w-290 w-full mx-auto px-6 pt-10">
        <p className="text-center text-[#032b41]">Loading...</p>
      </main>
    );
  }

  return (
    <div>
      <main className="max-w-290 w-full mx-auto px-6 overflow-y-auto">
        <div className="pt-10 w-full">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
            Settings
          </h1>

          {user ? (
            <>
              {/* Subscription Plan */}
              <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                Your Subscription Plan
                <p className="font-normal flex items-center gap-2 mt-2">
                  {membership === "basic" ? (
                    user.email?.startsWith("guest-") ? (
                      "Guest (Basic)"
                    ) : (
                      "Basic"
                    )
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

                {membership === "basic" &&
                <div className="mt-4">
                <Link
                href={"/choose-plan"}
                className="bg-[#2bd97c] font-normal px-4 py-2 rounded-sm transition duration-200 hover:bg-[#27c46b]"
                >
                  Upgrade to Premium
                </Link>
                  </div>
                }
              </div>

              {/* Email */}
              <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                Email
                <p className="font-normal overflow-x-auto mt-2">
                  {email || `Guest-${user?.uid?.slice(0, 6)}@mock.com`}
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
