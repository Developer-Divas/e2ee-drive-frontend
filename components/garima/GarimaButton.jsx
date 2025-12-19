"use client";

import { useState, useEffect } from "react";
import GarimaModal from "./GarimaModal";

export default function GarimaButton() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Show subtle hint after idle time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 9000); // 9s idle nudge

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hint bubble */}
      {showHint && !open && (
        <div
          className="
            fixed bottom-20 right-6 z-[9999]
            px-3 py-1.5
            text-xs text-white/90
            bg-black/80 rounded-lg
            backdrop-blur
            animate-garima-fade-in
          "
        >
          Need help?
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-[9999]
          w-14 h-14 rounded-full
          bg-gradient-to-br from-blue-600 to-indigo-600
          text-white text-xl font-semibold
          shadow-lg shadow-indigo-500/40
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110
          animate-garima-breathe
        "
        title="Ask Garima"
      >
        G
      </button>

      {/* Modal */}
      {open && <GarimaModal onClose={() => setOpen(false)} />}
    </>
  );
}
