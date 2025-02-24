"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// Helper to compute total spent from rides array
function getTotalSpent(rides) {
  return rides.reduce((total, ride) => total + (parseFloat(ride.fare) || 0), 0);
}

export default function ProfileCard({ rideData }) {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");

  // Load extra profile info (username) from localStorage on mount.
  useEffect(() => {
    const extra = localStorage.getItem("profileExtra");
    if (extra) {
      try {
        const parsed = JSON.parse(extra);
        setUsername(parsed.username || "");
      } catch (e) {
        console.error("Failed to parse profileExtra", e);
      }
    }
  }, []);

  if (status === "loading") {
    return <p className="p-4 text-xl">Loading profile...</p>;
  }

  if (!session || !session.user) {
    return <p className="p-4 text-xl">Please log in to view your profile.</p>;
  }

  const { name, email } = session.user;
  // Compute total rides as the length of the rides array
  const totalRides = rideData?.rides?.length || 0;
  // Compute total spent from rideData.rides
  const totalSpent = getTotalSpent(rideData.rides || []);

  return (
    <div className="bg-white dark:bg-black p-8 rounded-xl shadow-lg flex flex-col items-center space-y-6">
      <h2 className="text-4xl font-bold">{name}</h2>
      <p className="text-xl">Email: {email}</p>
      <div className="flex justify-around w-full max-w-lg">
        <div className="text-center">
          <p className="text-2xl font-semibold">{totalRides}</p>
          <p className="text-lg">Total Rides</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-semibold">₹{totalSpent.toFixed(2)}</p>
          <p className="text-lg">Total Spent</p>
        </div>
      </div>
    </div>
  );
}
