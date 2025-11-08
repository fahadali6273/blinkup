"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi! Main Blinku! Assistant hoon. Kaise madad kar sakta hoon aaj?" },
  ]);
  const [input, setInput] = useState("");
  const [userName, setUserName] = useState("");
  const [userService, setUserService] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    audioRef.current = new Audio("/notification.mp3");
  }, []);

  const playSound = async () => {
    try {
      if (audioRef.current) await audioRef.current.play();
    } catch {
      /* ignore autoplay blocks */
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    const text = input.trim().toLowerCase();
    setInput("");

    setTimeout(async () => {
      let reply = "";

      if (isCompleted) {
        reply = "😊 Aapka request record ho gaya hai! Jaldi hi hum contact karenge.";
      } else if (!userName) {
        setUserName(input);
        reply = `Nice to meet you ${input}! Kaunsi service chahiye aapko? (Painting, Electrician, Plumbing, etc.)`;
      } else if (!userService) {
        setUserService(input);
        reply = `🎯 ${input} ke liye experts available hain! Kis area me service chahiye?`;
      } else if (!userLocation) {
        setUserLocation(input);
        setIsCompleted(true);
        reply = `✅ Great ${userName}! ${input} me BlinkUp ke partners available hain. Aapka ${userService} request record ho gaya hai. Jaldi hi hum aapse contact karenge.`;

        await fetch("/api/chatLead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            service: userService,
            location: input,
          }),
        });
      }

      setMessages((p) => [...p, { sender: "bot", text: reply }]);
      playSound();
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-400 text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          💬 Blinku!
        </button>
      )}

      {isOpen && (
        <div className="w-80 h-[480px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-400 text-white p-3 flex items-center justify-between">
            <span className="font-semibold text-sm">Blinku! – Your Smart Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-lg font-bold"
            >
              −
            </button>
          </div>

          {/* Chat body */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`my-2 p-2 rounded-lg text-sm max-w-[80%] ${
                  m.sender === "bot"
                    ? "bg-purple-100 text-gray-800 self-start"
                    : "bg-purple-600 text-white self-end ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button
              onClick={handleSend}
              className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



