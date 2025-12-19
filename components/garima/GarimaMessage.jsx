"use client";

export default function GarimaMessage({ role, text }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[80%]
          px-3 py-2 rounded-lg text-sm leading-relaxed
          ${isUser
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-white/90"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
