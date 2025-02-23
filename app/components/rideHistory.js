"use client";

export default function RideHistory({ rides = [] }) {
  return (
    <div>
      {rides.length === 0 ? (
        <p>No rides yet.</p>
      ) : (
        <ul className="space-y-2">
          {rides.map((ride, index) => (
            <li key={index} className="border p-2 rounded">
              <p>Date: {ride.date}</p>
              <p>Fare: ${ride.fare}</p>
              <p>Driver: {ride.driver}</p>
              <p>Location: {ride.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
