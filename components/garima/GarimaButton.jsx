"use client";

import { useState } from "react";
import GarimaModal from "./GarimaModal";

export default function GarimaButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed bottom-6 right-6 z-[9999]
          w-12 h-12 rounded-full
          bg-blue-600 hover:bg-blue-700
          text-white text-xl
          shadow-lg
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
