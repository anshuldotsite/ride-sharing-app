"use client";
import { useSession } from "next-auth/react";

export default function ProfileCard({ rideData }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!session || !session.user) {
    return <p>No profile data available. Please log in.</p>;
  }

  // Extracting name and email from session (Google Auth provides these)
  const { name, email } = session.user;

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold">{name}</h2>
      <p>Email: {email}</p>
      {/* Optionally include additional stats or dummy values from rideData */}
      <p>Total Rides: {rideData?.user?.rideCount || 0}</p>
      <p>Total Spent: ${rideData?.user?.totalSpent || 0}</p>
    </div>
  );
}
