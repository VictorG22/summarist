"use client";

import { stripePromise } from "@/lib/stripe/stripe";

interface CheckoutButtonProps {
  priceId: string;
  uid: string;
  email?: string;
}

export default function CheckoutButton({
  priceId,
  uid,
  email,
}: CheckoutButtonProps) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, uid, email }),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      console.error("Checkout error:", data.error);
      // Consider showing user feedback here
      return;
    }
    if (data.url) {
      window.location.href = data.url; // redirect to Stripe checkout
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-400 text-white h-10 rounded-sm px-4 hover:bg-green-500 transition"
    >
      Checkout
    </button>
  );
}
