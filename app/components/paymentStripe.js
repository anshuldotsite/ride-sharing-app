import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default function PaymentStripe() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });

    if (!res.ok) {
      console.error("Failed to create Stripe session");
      setLoading(false);
      return;
    }

    const { sessionId } = await res.json();
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) console.error(error);
    setLoading(false);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        type="submit"
        onClick={handleCheckout}
        className="w-48 p-2 font-semibold text-lg bg-black text-white dark:bg-white dark:text-black rounded-xl cursor-pointer"
      >
        {loading ? "Processing..." : "Book Ride"}
      </button>
    </div>
  );
}
