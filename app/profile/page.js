"use client";
import Navbar from "../components/navbar";
import ProfileCard from "../components/profileCard";
import rideData from "../data/rideData";

export default function Profile() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <ProfileCard rideData={rideData} />
      </main>
    </div>
  );
}
