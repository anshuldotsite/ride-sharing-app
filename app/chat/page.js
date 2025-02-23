"use client";

import Navbar from "../components/navbar";
import ChatBox from "../components/chatBox";

export default function Chat() {
  return (
    <div>
      <Navbar />
      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Live Chat</h1>
        <ChatBox />
      </main>
    </div>
  );
}
