"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";

function Settings() {
  const [userStatus, setUserStatus] = useState(false);
  const [userPlan, setUserPlan] = useState("basic");

  return (
    <div>
      <main className="max-w-290 w-full mx-auto px-6 overflow-y-auto">
        <div className="pt-10 w-full">
          <div className="mb-6">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
              Settings
            </h1>
            {userStatus ? (
              <>
                <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                  Your Subscription Plan
                  <p className="font-normal flex items-center gap-2">
                    {userPlan === "basic" ? (
                      <>Basic</>
                    ) : userPlan === "premium" ? (
                      <>
                        Premium <BsFillStarFill color="gold" />
                      </>
                    ) : userPlan === "premium-plus" ? (
                      <>
                        Premium + <BsFillStarFill color="gold" />{" "}
                        <BsFillStarFill color="gold" />
                      </>
                    )
                    :
                    (
                    <>
                    Error Please contact support regarding your status
                    </>
                    )}
                  </p>
                </div>
                <div className="text-lg font-bold mb-6 text-[#032b41] border-b border-gray-300 pb-6">
                  Email
                  <p className="font-normal overflow-x-auto">guest@guest.com</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col mx-auto justify-center items-center max-w-115 gap-6">
                  <Image
                    src={"/login.png"}
                    width={460}
                    height={460}
                    alt="login image"
                  />
                  <h2 className="text-[#032b41] text-2xl font-bold tracking-tight">
                    Log in to your account to see your details
                  </h2>
                  <button
                    onClick={() => setUserStatus(!userStatus)}
                    className="max-w-50 w-full bg-[#2bd97c] h-10 rounded-sm text-base hover:bg-[#20ba68] transition duration-200 cursor-pointer"
                  >
                    Login
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
