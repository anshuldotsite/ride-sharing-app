"use client";
import Navbar from "../components/navbar";
import RideBookingForm from "../components/rideBookingForm";
import RideHistory from "../components/rideHistory";
import PaymentMethods from "../components/paymentMethods";
import FeedbackForm from "../components/feedbackForm";
import rideData from "../data/rideData";

export default function Dashboard() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Book a Ride</h2>
          <RideBookingForm />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Ride History</h2>
          <RideHistory rides={rideData.rides} />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Payment Methods</h2>
          <PaymentMethods />
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Feedback</h2>
          <FeedbackForm />
        </section>
      </main>
    </div>
  );
}
