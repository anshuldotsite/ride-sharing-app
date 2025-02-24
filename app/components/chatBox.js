"use client";
import { useState } from "react";

const driverResponses = [
  "I'm on my way.",
  "I'll be there in 5 minutes.",
  "Please wait a moment.",
  "I'm checking the route, please hold on.",
];

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user's message
    const userMsg = { sender: "User", text: message };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");

    // Simulate driver response after a delay
    setTimeout(() => {
      const response =
        driverResponses[Math.floor(Math.random() * driverResponses.length)];
      const driverMsg = { sender: "Driver", text: response };
      setChat((prev) => [...prev, driverMsg]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white border p-4 rounded shadow-md flex flex-col scroll-0">
      <div className="flex-1 overflow-y-auto mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`my-1 bg-white text-black dark:bg-black dark:text-white ${
              msg.sender === "Driver" ? "text-blue-500" : "text-black"
            }`}
          >
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input flex-1 p-2 border rounded bg-white dark:bg-black text-black dark:text-white"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary ml-2 p-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
