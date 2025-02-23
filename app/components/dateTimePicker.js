"use client";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [showTimePicker, setShowTimePicker] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    setShowTimePicker(false);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
    setShowCalendar(false);
  };

  // Generate time options (every 30 minutes for the next 12 hours, for example)
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    // Round minutes up to nearest 30 for a clean start
    now.setMinutes(Math.ceil(now.getMinutes() / 30) * 30);
    for (let i = 0; i < 24; i++) {
      const timeOption = new Date(now.getTime() + i * 30 * 60000);
      options.push(timeOption);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex space-x-2 mb-4">
      {/* "Today" Input with Calendar Popup */}
      <div className="relative w-1/2">
        <input
          type="text"
          readOnly
          onClick={toggleCalendar}
          value={selectedDate.toLocaleDateString()} // Will show current date/time by timezone
          className="w-full p-2 border rounded bg-white dark:bg-black text-black dark:text-white cursor-pointer"
          placeholder="Today"
        />
        {showCalendar && (
          <div className="absolute z-10 mt-1">
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              value={selectedDate}
            />
          </div>
        )}
      </div>

      <div className="relative w-1/2">
        <input
          type="text"
          readOnly
          onClick={toggleTimePicker}
          value={selectedTime || "Now"}
          className="w-full p-2 border rounded bg-white dark:bg-black text-black dark:text-white cursor-pointer"
          placeholder="Now"
        />
        {showTimePicker && (
          <div className="absolute z-10 mt-1 bg-white dark:bg-black text-black dark:text-white border rounded max-h-60 overflow-auto">
            {timeOptions.map((time, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTime(formatTime(time));
                  setShowTimePicker(false);
                }}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
              >
                {formatTime(time)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
