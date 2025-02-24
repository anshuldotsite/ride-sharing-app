"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import MapComponent from "./map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "./dateTimePicker";
import RecentActivityMessage from "./recentActivity";
import PaymentStripe from "./paymentStripe";
import LocationSearch from "./locationSearch";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function RideBookingForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [estimatedFare, setEstimatedFare] = useState(null);

  const calculateFare = useCallback(() => {
    const baseFare = 50;
    const distance = Math.random() * 25 + 5; // simulate 5 to 30 km
    const rate = rideType === "premium" ? 15 : 10;
    const fare = baseFare + distance * rate;
    setEstimatedFare(Math.round(fare));
  }, [rideType]);

  useEffect(() => {
    if (pickup && destination) {
      calculateFare();
    }
  }, [pickup, destination, rideType, calculateFare]);

  return (
    <>
      <motion.div
        // We keep inline-block and the same classes as before to preserve size
        className="relative inline-block p-4 rounded shadow-md mb-4 h-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Position the BorderBeam absolutely to cover only this container's border */}
        <BorderBeam
          duration={4}
          size={1200}
          reverse
          className="absolute inset-0 pointer-events-none from-transparent via-green-500 to-transparent"
        />

        <form className="space-y-4 h-full flex flex-col justify-start">
          {/* Pickup Location */}
          <motion.div
            className="flex flex-row items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faLocationArrow} className="w-5 mb-11" />
            <LocationSearch
              label="Pickup location"
              value={pickup}
              onSelect={setPickup}
            />
          </motion.div>

          {/* Dropoff Location */}
          <motion.div
            className="flex flex-row items-center space-x-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faThumbtack} className="w-5 mb-11" />
            <LocationSearch
              label="Dropoff location"
              value={destination}
              onSelect={setDestination}
            />
          </motion.div>

          <DateTimePicker />

          <div className="flex flex-col space-y-4">
            <div className="flex flex-row text-lg space-x-4 font-semibold">
              <p>Choose your ride type:</p>
              <select
                className="bg-white dark:bg-black text-black dark:text-white"
                value={rideType}
                onChange={(e) => setRideType(e.target.value)}
                required
              >
                <option value="economy">Economy</option>
                <option value="premium">Premium</option>
              </select>
            </div>
            {pickup && destination && estimatedFare !== null && (
              <p className="text-lg font-semibold">
                Estimated Fare: ₹ {estimatedFare}
              </p>
            )}
            <div className="mt-4">
              <MapComponent pickup={pickup} destination={destination} />
            </div>

            <div className="flex justify-center mt-4">
              <PaymentStripe
                amount={estimatedFare ? estimatedFare * 100 : 0}
                currency="inr"
              />
            </div>
          </div>
        </form>
      </motion.div>
      <RecentActivityMessage />
    </>
  );
}
