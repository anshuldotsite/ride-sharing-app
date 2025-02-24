"use client";
import { useState, useEffect, useCallback } from "react";
import MapComponent from "./map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faThumbtack,
} from "@fortawesome/free-solid-svg-icons";
import DateTimePicker from "./dateTimePicker";
import RecentActivityMessage from "./recentActivity";
import PaymentStripe from "./paymentStripe";
import LocationSearch from "./locationSearch"; // import our autocomplete component

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
      <div className="border p-4 rounded shadow-md inline-block mb-4">
        <form className="space-y-4">
          {/* Pickup Location */}
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon icon={faLocationArrow} className="w-5 mb-1" />
            <label className="block font-semibold">Pickup Location</label>
          </div>
          <LocationSearch
            label="Pickup location"
            value={pickup}
            onSelect={setPickup}
          />

          {/* Dropoff Location */}
          <div className="flex flex-row items-center space-x-2">
            <FontAwesomeIcon icon={faThumbtack} className="w-5 mb-1" />
            <label className="block font-semibold">Dropoff Location</label>
          </div>
          <LocationSearch
            label="Dropoff location"
            value={destination}
            onSelect={setDestination}
          />

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
      </div>
      <RecentActivityMessage />
    </>
  );
}
