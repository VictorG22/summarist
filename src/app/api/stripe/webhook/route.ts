import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY!)
    ),
  });
}

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig)
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );

  const body = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    // Prevent duplicate events
    const eventRef = db.collection("stripeEvents").doc(event.id);
    const eventSnapshot = await eventRef.get();
    if (eventSnapshot.exists) {
      console.log(`Duplicate Stripe event ignored: ${event.id}`);
      return NextResponse.json({ received: true });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const uid = session.metadata?.uid;

      if (!uid) {
        console.error("Webhook: UID missing in session metadata");
      } else {
        const userRef = db.collection("users").doc(uid);
        const userSnapshot = await userRef.get();

        if (!userSnapshot.exists) {
          console.error(`User document not found for uid: ${uid}`);
        } else if (!session.subscription || typeof session.subscription !== "string") {
          console.error("Subscription ID missing or invalid in session:", session);
        } else {
          // Retrieve subscription & latest invoice
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          const invoiceId = subscription.latest_invoice;
          
          if (!invoiceId || typeof invoiceId !== "string") {
            console.error("Latest invoice ID missing for subscription:", subscription.id);
          } else {
            const invoice = await stripe.invoices.retrieve(invoiceId);

            if (invoice.status === "paid") {
              await userRef.update({
                membership: "premium",
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: "active",
              });
              console.log(`User ${uid} upgraded to premium`);
            } else {
              await userRef.update({
                stripeCustomerId: session.customer,
                stripeSubscriptionId: subscription.id,
                subscriptionStatus: "incomplete",
              });
              console.log(
                `Subscription invoice not paid yet for user ${uid}, status: ${invoice.status}`
              );
            }
          }
        }
      }
    }

    await db.collection("stripeEvents").doc(event.id).set({ handled: true });
    console.log(`Stripe event processed: ${event.id}`);

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
