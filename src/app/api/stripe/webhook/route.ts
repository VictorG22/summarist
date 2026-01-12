import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase/client";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Idempotency: skip if already processed
  const eventRef = doc(db, "stripeEvents", event.id);
  const eventSnapshot = await getDoc(eventRef);
  if (eventSnapshot.exists()) return NextResponse.json({ received: true });

  await setDoc(eventRef, { handled: true });

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.metadata?.uid;

    if (uid) {
      const userRef = doc(db, "users", uid);

      await updateDoc(userRef, {
        membership: "premium",
        stripeCustomerId: session.customer,
        stripeSubscriptionId: session.subscription,
        subscriptionStatus: "active",
      });

      console.log(`User ${uid} upgraded to premium`);
    }
  }

  return NextResponse.json({ received: true });
}
