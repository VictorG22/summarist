"use client";

import { stripePromise } from "@/lib/stripe/stripe";


interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
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
