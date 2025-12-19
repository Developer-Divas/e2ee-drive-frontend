"use client";

import { useState, useRef, useEffect } from "react";
import useGarimaChat from "@/components/garima/useGarimaChat";
import GarimaMessage from "./GarimaMessage";
import GarimaTyping from "./GarimaTyping";

export default function GarimaModal({ onClose }) {
  const { messages, loading, sendMessage } = useGarimaChat();
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // ✅ AUTO-SCROLL EFFECT (CORRECT PLACE)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="
          absolute bottom-6 right-6
          w-[380px] h-[520px]
          bg-[#0d0e12]
          border border-white/10
          rounded-xl
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3 border-b border-white/10 flex justify-between">
          <span className="text-sm font-medium">Garima</span>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((m, i) => (
            <GarimaMessage key={i} role={m.role} text={m.text} />
          ))}

          {loading && <GarimaTyping />}

          {/* 👇 SCROLL ANCHOR */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10 flex gap-2">
          <input
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                sendMessage(input);
                setInput("");
              }
            }}
            placeholder="Ask Garima about this project…"
            className="
              flex-1 bg-black/40
              border border-white/10
              rounded-md px-3 py-2
              text-sm outline-none
            "
          />
          <button
            onClick={() => {
              if (!input.trim()) return;
              sendMessage(input);
              setInput("");
            }}
            className="px-4 py-2 bg-blue-600 rounded-md text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
