"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket = io(); // Connect to your Socket.io server
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white border p-4 rounded shadow-md h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {chat.map((msg, index) => (
          <p key={index} className="my-1">
            {msg}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input flex-1"
          placeholder="Type your message..."
        />
        <button type="submit" className="btn btn-primary ml-2">
          Send
        </button>
      </form>
    </div>
  );
}
