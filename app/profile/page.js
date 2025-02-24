"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import rideData from "../data/rideData";
import PaymentMethodsManager from "../components/paymentMethodsManager";
import ProfileCard from "../components/profileCard";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-4">Loading profile...</p>;
  }

  if (!session || !session.user) {
    return <p className="p-4">Please log in to view your profile.</p>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="container mx-auto p-4 space-y-8">
        <ProfileCard rideData={rideData} />
        <section className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Ride History</h2>
          {rideData.rides && rideData.rides.length > 0 ? (
            <ul className="space-y-4">
              {rideData.rides.map((ride, index) => (
                <li key={index} className="border p-4 rounded">
                  <p>
                    <strong>Date:</strong> {ride.date}
                  </p>
                  <p>
                    <strong>Fare:</strong> ₹{ride.fare}
                  </p>
                  <p>
                    <strong>Driver:</strong> {ride.driver}
                  </p>
                  <p>
                    <strong>Location:</strong> {ride.location}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No rides yet.</p>
          )}
        </section>
        <section className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
          <PaymentMethodsManager />
        </section>

        <section className="border p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <div className="border p-4 rounded">
            {rideData.testimonials && rideData.testimonials.length > 0 ? (
              <ul className="space-y-4">
                {rideData.testimonials.map((testimonial) => (
                  <li key={testimonial.id} className="border p-4 rounded">
                    <p>
                      <strong>Rating:</strong> {testimonial.rating}
                    </p>
                    <p>
                      <strong>Review:</strong> {testimonial.review}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No feedback submitted yet.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
