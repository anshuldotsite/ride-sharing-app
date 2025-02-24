import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      // For testing only—replace these lines:
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe session creation error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
