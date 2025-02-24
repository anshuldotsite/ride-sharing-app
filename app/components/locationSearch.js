"use client";
import { useState } from "react";

export default function LocationSearch({ label, value, onSelect }) {
  const [query, setQuery] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      // Use the Photon API endpoint with a limit parameter.
      const res = await fetch(
        `https://photon.komoot.io/api/?q=${encodeURIComponent(
          newQuery
        )}&limit=5`
      );
      if (!res.ok) {
        console.error("Photon API error:", res.statusText);
        return;
      }
      const data = await res.json();
      // Photon returns a JSON object with a "features" array.
      setSuggestions(data.features);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  const handleSelect = (suggestion) => {
    // Build a display name from the suggestion properties.
    const { name, city, town, village } = suggestion.properties;
    const locationName = [name, city || town || village]
      .filter(Boolean)
      .join(", ");
    setQuery(locationName);
    setSuggestions([]);
    onSelect(locationName);
  };

  return (
    <div className="relative">
      <label className="block font-semibold mb-1">{label}</label>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border rounded bg-white dark:bg-black text-black dark:text-white"
        placeholder={`Enter ${label}`}
        required
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-black border rounded max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.properties.osm_id}
              onClick={() => handleSelect(item)}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
            >
              {item.properties.name},{" "}
              {item.properties.city ||
                item.properties.town ||
                item.properties.village}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
