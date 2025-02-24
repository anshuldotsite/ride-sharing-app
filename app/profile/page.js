"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/navbar";
import rideData from "../data/rideData";
import PaymentMethodsManager from "../components/paymentMethodsManager";
import ProfileCard from "../components/profileCard";
import { motion } from "framer-motion";
import FeedbackSection from "../components/feedBackSection";

// Helper to count rides per month
function getMonthlyRides(rides) {
  const monthlyCounts = {};
  rides.forEach((ride) => {
    // Parse the date from ride.date
    const date = new Date(ride.date);
    if (!isNaN(date)) {
      // Construct a "YYYY-MM" key
      const yearMonth = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthlyCounts[yearMonth] = (monthlyCounts[yearMonth] || 0) + 1;
    }
  });
  return monthlyCounts;
}

// Helper to sum all fares from the ride history
function getTotalSpent(rides) {
  return rides.reduce((acc, ride) => acc + (parseFloat(ride.fare) || 0), 0);
}

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="p-4">Loading profile...</p>;
  }

  if (!session || !session.user) {
    return <p className="p-4">Please log in to view your profile.</p>;
  }

  // 1) Calculate total spent from the ride array
  const totalSpent = getTotalSpent(rideData.rides || []);

  // 2) Calculate monthly ride counts for the bar chart
  const monthlyCounts = getMonthlyRides(rideData.rides || []);
  const sortedMonths = Object.keys(monthlyCounts).sort();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Profile Header Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6 pt-8"
      >
        <ProfileCard rideData={rideData} />

        {/* Tab-like navigation row (placeholders) */}
        <div className="mt-6 flex justify-center space-x-4 border-b border-gray-200 dark:border-gray-700">
          {["Overview"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`pb-2 px-2 text-sm font-medium hover:text-blue-500 ${
                  i === 0
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </motion.section>

      {/* Main Content Section */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Progress Statistic & Activity row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Left: Progress Statistic (Ring chart showing totalSpent) */}
          <div className=" bg-white dark:bg-black text-black dark:text-white">
            <h3 className="text-xl font-bold mb-4">Progress Statistic</h3>
            <p className="text-sm bg-white dark:bg-black text-black dark:text-white mb-4">
              <strong>Total Amount Spent</strong>
            </p>
            {/* Ring chart placeholder */}
            <div className="relative flex items-center justify-center w-32 h-32 mx-auto">
              {/* Outer ring */}
              <div className="absolute w-32 h-32 border-8 border-blue-500 rounded-full" />
              {/* Inner ring (background) */}
              <div className="absolute w-32 h-32 border-8 border-gray-300 dark:border-gray-700 rounded-full clip-half" />
              {/* Center label */}
              <span className="text-sm font-semibold">
                ₹{Math.round(totalSpent)}
              </span>
            </div>
            <p className="mt-4 text-sm bg-white dark:bg-black text-black dark:text-white text-center">
              {`Total Spent ₹${Math.min(totalSpent)}`}
            </p>
          </div>

          {/* Right: Activity (Bar chart with monthly rides) */}
          <div className=" bg-white dark:bg-black text-black dark:text-white">
            <h3 className="text-xl font-bold mb-4">Activity</h3>
            <p className="text-sm bg-white dark:bg-black text-black dark:text-white mb-4">
              <strong>Rides per Month</strong>
            </p>
            {sortedMonths.length > 0 ? (
              <div className="flex items-end space-x-2 h-40 bg-white dark:bg-black rounded p-2">
                {sortedMonths.map((month, i) => {
                  const count = monthlyCounts[month];
                  // Scale bar height up to 80px max
                  const barHeight = Math.min(count * 10, 80);
                  return (
                    <div key={month} className="text-center">
                      <div
                        className="bg-blue-500 w-4 mx-auto"
                        style={{ height: `${barHeight}px` }}
                      />
                      <p className="text-xs mt-1 bg-white dark:bg-black text-black dark:text-white">
                        {month}
                      </p>
                      <p className="text-xs bg-white dark:bg-black text-black dark:text-white">
                        {count}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm bg-white dark:bg-black text-black dark:text-white">
                No rides recorded.
              </p>
            )}

          </div>
        </motion.div>

        {/* Ride History */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-6 rounded-lg shadow-lg bg-white dark:bg-black text-black dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Ride History</h2>
          {rideData.rides && rideData.rides.length > 0 ? (
            <ul className="space-y-4">
              {rideData.rides.map((ride, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="p-4 rounded border bg-white dark:bg-black text-black dark:text-white"
                >
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
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>No rides yet.</p>
          )}
        </motion.section>

        {/* Payment Methods Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-6 rounded-lg shadow-lg bg-white dark:bg-black text-black dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
          <PaymentMethodsManager />
        </motion.section>

        {/* Feedback Section */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="p-6 rounded-lg shadow-lg  bg-white dark:bg-black text-black dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Feedback</h2>
          <div className="border p-4 rounded  bg-white dark:bg-black text-black dark:text-white">
          <FeedbackSection testimonials={rideData.testimonials} />
          </div>
        </motion.section>
      </main>
    </div>
  );
}
