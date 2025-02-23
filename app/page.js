"use client";

import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="p-4 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-semibold mb-4">Welcome to RideShare</h1>
        <p className="mb-4">
          Book your ride, share with friends, and enjoy the journey!
        </p>
      </main>
    </div>
  );
}
