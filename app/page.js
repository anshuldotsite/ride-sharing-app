"use client";
import Navbar from "./components/navbar";
import MapComponent from "./components/map";
import RideBookingForm from "./components/rideBookingForm";
import { motion } from "framer-motion";
// import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <main className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16">
          <motion.h1
            className="text-5xl font-bold mb-8"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Go anywhere with RideShare
            {/* <LineShadowText className="italic" shadowColor={shadowColor}>
        Share
      </LineShadowText> */}
          </motion.h1>
          <div className="flex space-x-4 mb-6">
            <h1 className="px-4 py-2 border-b-2 border-black dark:border-white font-semibold">
              Ride
            </h1>
          </div>
          <RideBookingForm />
        </div>
        <div className="w-full md:w-1/2 h-[60vh] md:h-auto bg-gray-200 dark:bg-gray-800">
          <MapComponent />
        </div>
      </main>
    </div>
  );
}
