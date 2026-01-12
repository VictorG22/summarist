"use client";
import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import Image from "next/image";
import { PiFileTextFill, PiPlantFill } from "react-icons/pi";
import FAQ from "../components/UI/FAQ";
import { FaHandshake } from "react-icons/fa6";
import { accordionItems } from "../data/accordionItems";
import { useAuth } from "../context/AuthContext";
import { Stripe } from "@stripe/stripe-js";
import { stripePromise } from "@/lib/stripe/stripe";
import { useAuthModal } from "../context/AuthModalContext";

type Plan = "yearly" | "monthly";

export default function ChoosePlanPage() {
  const [selectedPlan, setSelectedPlan] = useState<Plan>("yearly");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const priceIdMap = {
    monthly: "price_1SoYjyD2Re4oUGQwWDLzJxQD",
    yearly: "price_1SoYmMD2Re4oUGQwQBpM4gkO",
  };

  const handleCheckout = async (priceId: string) => {
    if (!user) {
      openModal("login");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, uid: user.uid, email: user.email }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        console.error("Checkout error:", data.error || response.statusText);
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No URL returned from checkout API");
        setLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-6 flex flex-col items-center px-6 pt-12 bg-[#032b41] md:rounded-br-[35%] md:rounded-bl-[35%]">
        <div className="max-w-250 mx-auto">
          <h1 className="mb-8 text-white font-bold capitalize text-center text-2xl md:text-5xl">
            get unlimited access to many amazing books to read
          </h1>
          <p className="mb-8 text-white text-center text-lg md:text-[20px]">
            Turn ordinary moments into amazing learning opportunities
          </p>
          <figure className="flex justify-center mx-auto">
            <Image
              src={"/pricing-top.png"}
              height={340}
              width={340}
              alt="price image"
              className="rounded-tr-[180px] rounded-tl-[180px]"
            />
          </figure>
        </div>
      </div>

      <div className="w-full flex flex-col max-w-200 mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-1 justify-center text-center gap-6 max-w-200 mx-auto my-14">
          <div className="flex flex-col items-center mx-auto">
            <PiFileTextFill className="text-[#032b41] h-15 w-15" />
            <p className="text-[#032b41] text-center">
              <span className="font-bold">Key ideas in a few mins </span>
              with many books to read
            </p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <PiPlantFill className="text-[#032b41] h-15 w-15" />
            <p className="text-[#032b41] text-center">
              <span className="font-bold">3 million </span>
              people growing with Summarist everyday
            </p>
          </div>
          <div className="flex flex-col items-center mx-auto">
            <FaHandshake className="text-[#032b41] h-15 w-15" />
            <p className="text-[#032b41] text-center">
              <span className="font-bold">Precise recommendations </span>
              collections curated by experts
            </p>
          </div>
        </div>

        <div className="max-w-170 w-full mx-auto">
          <h2 className="text-center font-bold text-[#032b41] text-2xl md:text-3xl mb-8">
            Choose the plan that fits you
          </h2>

          <div
            role="radiogroup"
            aria-label="Choose your subscription plan"
            className="flex flex-col gap-6"
          >
            <div
              role="radio"
              aria-checked={selectedPlan === "yearly"}
              tabIndex={0}
              onClick={() => setSelectedPlan("yearly")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedPlan("yearly");
              }}
              className={`w-full flex gap-6 p-4 md:p-6 rounded-sm cursor-pointer border-4 transition ${
                selectedPlan === "yearly"
                  ? "bg-[#f1f6f4] border-[#2be080]"
                  : "bg-[#f1f6f4] border-[#bac8cc]"
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                {selectedPlan === "yearly" && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[#032b41] font-bold text-md md:text-xl">
                  Premium Plus Yearly
                </h3>
                <p className="text-[#032b41] font-bold text-xl md:text-2xl">
                  $89.99/year
                </p>
                <p className="text-[#6b757b] text-[14px]">
                  7-day free trial included
                </p>
              </div>
            </div>

            <div className="flex justify-center my-6">
              <div className="flex items-center gap-2 w-full max-w-60">
                <div className="flex-1 h-px bg-[#bac8ce]"></div>
                <p className="text-[#6b757b] text-[14px]">or</p>
                <div className="flex-1 h-px bg-[#bac8ce]"></div>
              </div>
            </div>

            <div
              role="radio"
              aria-checked={selectedPlan === "monthly"}
              tabIndex={0}
              onClick={() => setSelectedPlan("monthly")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setSelectedPlan("monthly");
              }}
              className={`w-full flex gap-6 p-6 rounded-sm cursor-pointer border-4 transition ${
                selectedPlan === "monthly"
                  ? "bg-[#f1f6f4] border-[#2be080]"
                  : "bg-[#f1f6f4] border-[#bac8cc]"
              }`}
            >
              <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                {selectedPlan === "monthly" && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full mx-auto" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-[#032b41] font-bold text-base md:text-xl">
                  Premium Monthly
                </h3>
                <p className="text-[#032b41] font-bold text-xl md:text-2xl">
                  $12.99/month
                </p>
                <p className="text-[#6b757b] text-[14px]">No trial included</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-8 flex flex-col items-center gap-4 sticky bottom-0">
          <button
            onClick={() => handleCheckout(priceIdMap[selectedPlan])}
            disabled={loading}
            className="min-w-75 h-10 text-[16px] text-[#032b41] bg-[#2be080] hover:bg-[#20ba68] rounded-sm transition duration-200 cursor-pointer"
          >
            <span>
              {selectedPlan === "yearly"
                ? "Start your free 7-day trial"
                : "Start your first month"}
            </span>
          </button>
          <p className="text-xs tracking-tight text-gray-500">
            {selectedPlan === "yearly"
              ? "Cancel your trial at any time before it ends, and you won’t be charged."
              : "30-day money back guarantee, no questions asked."}
          </p>
        </div>
      </div>

      <div className="max-w-270 mb-12 mx-auto">
        <FAQ list={accordionItems} />
      </div>

      <Footer />
    </div>
  );
}
