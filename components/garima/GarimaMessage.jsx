"use client";

import { useState } from "react";

export default function GarimaMessage({ role, text, details }) {
  const isUser = role === "user";
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[80%]
          px-3 py-2 rounded-lg text-sm leading-relaxed
          whitespace-pre-line
          ${isUser
            ? "bg-blue-600 text-white"
            : "bg-white/10 text-white/90"}
        `}
      >
        {/* MAIN MESSAGE */}
        {text}

        {/* EXPLAIN MORE BUTTON */}
        {!isUser && details && !showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className="block mt-2 text-xs text-blue-400 hover:underline"
          >
            Explain more
          </button>
        )}

        {/* EXPANDED DETAILS */}
        {!isUser && showDetails && details && (
          <div className="mt-2 pt-2 border-t border-white/10 text-xs text-white/70">
            {details}
          </div>
        )}
      </div>
    </div>
  );
}
