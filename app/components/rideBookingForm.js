"use client";
import { useState, useEffect, useCallback } from "react";
import MapComponent from "./map";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "./dateTimePicker";
import RecentActivityMessage from "./recentActivity";

export default function RideBookingForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [estimatedFare, setEstimatedFare] = useState(null);

  const calculateFare = useCallback(() => {
    // A realistic fare calculation:
    // Base fare of ₹50 plus a per km rate. Simulate a distance between 5 and 30 km.
    const baseFare = 50;
    const distance = Math.random() * 25 + 5; // 5 to 30 km
    const rate = rideType === "premium" ? 15 : 10; // Higher rate for premium
    const fare = baseFare + distance * rate;
    setEstimatedFare(Math.round(fare));
  }, [rideType]);

  // Automatically calculate fare when pickup, destination, or rideType changes
  useEffect(() => {
    if (pickup && destination) {
      calculateFare();
    }
  }, [pickup, destination, rideType, calculateFare]);

  const handleBooking = (e) => {
    e.preventDefault();
    // Redirect to Stripe payment gateway URL (dummy URL for now)
    window.location.href =
      "https://checkout.stripe.com/pay/cs_test_dummySessionId";
  };

  return (
    <>
      <div className="border p-4 rounded shadow-md inline-block mb-4">
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon icon={faLocationArrow} className="w-5 mb-1" />
            <label className="block font-semibold">Pickup Location</label>
          </div>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="min-w-[250px] p-2 mb-4 border rounded-lg bg-white dark:bg-black text-black dark:text-white"
            placeholder="Enter location"
          />
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon icon={faThumbtack} className="w-5 mb-1" />
            <label className="block font-semibold">Dropoff location</label>
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="min-w-[250px] p-2 mb-4 border rounded bg-white dark:bg-black text-black dark:text-white"
            placeholder="Where to?"
            required
          />
          <DateTimePicker />
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row text-lg space-x-4 font-semibold">
              <p>Choose your ride type:</p>
              <select
                className="space-x-1 bg-white dark:bg-black text-black dark:text-white"
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
              <button
                type="submit"
                className="w-48 p-2 font-semibold text-lg bg-black text-white dark:bg-white dark:text-black rounded-xl cursor-pointer"
                disabled={!pickup || !destination || estimatedFare === null}
                // Toast notification for booking ride has been booked, and
                // redirect to payment gateway
              >
                Book Ride
              </button>
            </div>
          </div>
        </form>
      </div>
      <RecentActivityMessage />
    </>
  );
}
