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
    
    // Add a predefined driver response after a delay
    setTimeout(() => {
      const response = driverResponses[Math.floor(Math.random() * driverResponses.length)];
      const driverMsg = { sender: "Driver", text: response };
      setChat((prev) => [...prev, driverMsg]);
    }, 1500);
  };

  return (
    <div className="h-96 w-full flex flex-col border p-4 rounded shadow-md bg-white dark:bg-black text-black dark:text-white">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto mb-2">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`my-1 ${msg.sender === "Driver" ? "text-blue-500" : "text-black dark:text-white"}`}
          >
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      {/* Input area always visible */}
      <div className="pt-2">
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-2 border rounded-l bg-white dark:bg-black text-black dark:text-white"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="p-2 border rounded-r bg-blue-500 text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
