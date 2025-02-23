"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Dynamically import the react-leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

export default function MapComponent({ pickup, destination }) {
  // For demonstration, we'll use a fixed center.
  // In a real-world scenario, you might geocode your pickup/destination to get coordinates.
  const center = [19.07609, 72.877426];

  return (
    <div className="my-4 border h-64 rounded">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            {pickup || "Pickup location"} to {destination || "Destination"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
