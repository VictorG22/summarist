import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  try {
    const { priceId, uid, email } = await req.json();

    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
    }
    if (!uid || typeof uid !== "string") {
      return NextResponse.json({ error: "Invalid uid" }, { status: 400 });
    }

    const DOMAIN = process.env.NEXT_PUBLIC_URL!; // must include https:// or http://

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${DOMAIN}/for-you`,
      cancel_url: `${DOMAIN}/choose-plan`,
      metadata: { uid },
      customer_email: email,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
