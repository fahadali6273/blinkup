"use client";
import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ role: string; text: string }[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const newChat = [...chat, { role: "user", text: message }];
    setChat(newChat);
    setMessage("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setChat([...newChat, { role: "bot", text: data.reply }]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-full shadow-xl z-50"
      >
        {open ? "×" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 bg-white w-80 h-96 shadow-lg rounded-2xl flex flex-col border border-gray-200 z-50">
          <div className="bg-purple-600 text-white p-3 rounded-t-2xl text-center font-semibold">
            BlinkUp Assistant
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {chat.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-purple-100 self-end text-right"
                    : "bg-gray-100 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex">
            <input
              className="flex-1 border p-2 rounded-lg text-sm focus:outline-purple-500"
              placeholder="Type message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-purple-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
