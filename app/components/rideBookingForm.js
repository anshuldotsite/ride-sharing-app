"use client";
import { useState, useEffect } from "react";
import MapComponent from "./map";
import { toast } from "react-toastify";
import { useCallback } from "react";

export default function RideBookingForm() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [rideType, setRideType] = useState("economy");
  const [estimatedFare, setEstimatedFare] = useState(null);

  const calculateFare = useCallback(() => {
    // Dummy fare calculation logic
    const fare =
      Math.floor(Math.random() * 20) + (rideType === "premium" ? 10 : 0);
    setEstimatedFare(fare);
  }, [rideType]);

  // Automatically calculate fare when pickup, destination, or rideType changes
  useEffect(() => {
    if (pickup && destination) {
      calculateFare();
    }
  }, [pickup, destination, rideType, calculateFare]);

  const handleBooking = async (e) => {
    e.preventDefault();
    // Dummy API call to book ride with the estimated fare
    const res = await fetch("/api/rides/book", {
      method: "POST",
      body: JSON.stringify({ pickup, destination, rideType, estimatedFare }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      toast.success("Ride booked successfully!");
    } else {
      toast.error("Booking failed.");
    }
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <form onSubmit={handleBooking} className="space-y-4">
        <input
          type="text"
          placeholder="Pickup Location"
          className="input w-full bg-white dark:bg-black text-black dark:text-white"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination Location"
          className="input w-full bg-white dark:bg-black text-black dark:text-white"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <div className="flex space-x-4">
          <select
            className="input bg-white dark:bg-black text-black dark:text-white"
            value={rideType}
            onChange={(e) => setRideType(e.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium">Premium</option>
          </select>
        </div>
        {pickup && destination && estimatedFare !== null && (
          <p>Estimated Fare: ${estimatedFare}</p>
        )}
        <MapComponent pickup={pickup} destination={destination} />
        <button
          type="submit"
          className="btn btn-primary w-full bg-white dark:bg-black text-black dark:text-white"
          disabled={!pickup || !destination || estimatedFare === null}
        >
          Book Ride
        </button>
      </form>
    </div>
  );
}
