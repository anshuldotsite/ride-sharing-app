"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import rideData from "../data/rideData";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-4">Loading profile...</p>;
  }

  if (!session || !session.user) {
    return <p className="p-4">Please log in to view your profile.</p>;
  }

  const { name, email } = session.user;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">
        <section className="mb-8 border p-4 rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p className="mb-2">
            <strong>Name:</strong> {name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {email}
          </p>
          <p className="mb-2">
            <strong>Total Rides:</strong> {rideData?.user?.rideCount || 0}
          </p>
          <p className="mb-2">
            <strong>Total Spent:</strong> ₹{rideData?.user?.totalSpent || 0}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Ride History</h2>
          {rideData.rides && rideData.rides.length > 0 ? (
            <ul className="space-y-2">
              {rideData.rides.map((ride, index) => (
                <li key={index} className="border p-2 rounded">
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

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Payment Methods</h2>
          <div className="border p-4 rounded">
            {rideData.paymentMethods && rideData.paymentMethods.length > 0 ? (
              <ul className="space-y-2">
                {rideData.paymentMethods.map((method) => (
                  <li key={method.id} className="border p-2 rounded">
                    <p>{method.card}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment methods available.</p>
            )}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Feedback</h2>
          <div className="border p-4 rounded">
            {rideData.testimonials && rideData.testimonials.length > 0 ? (
              <ul className="space-y-2">
                {rideData.testimonials.map((testimonial) => (
                  <li key={testimonial.id} className="border p-2 rounded">
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
