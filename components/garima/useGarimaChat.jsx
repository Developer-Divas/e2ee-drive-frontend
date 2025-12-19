"use client";

import { useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function useGarimaChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m Garima. Ask me anything about this E2EE Drive."
    }
  ]);

  const [loading, setLoading] = useState(false);

  async function sendMessage(text) {
    if (!text.trim()) return;

    // 1️⃣ Add user message instantly
    setMessages((prev) => [
      ...prev,
      { role: "user", text }
    ]);

    setLoading(true);

    try {
      // 2️⃣ Ask backend (intent engine runs there)
      const res = await fetch(`${API}/chat/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: text })
      });

      if (!res.ok) {
        throw new Error("Garima backend error");
      }

      const data = await res.json();

      // 3️⃣ Artificial thinking delay (UX polish)
      await new Promise((r) => setTimeout(r, 600));

      // 4️⃣ Add Garima reply
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer }
      ]);

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Sorry, I couldn’t respond right now. Please try again."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage
  };
}
