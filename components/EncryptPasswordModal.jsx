"use client";

import { useState } from "react";
import Portal from "./Portal";

export default function EncryptPasswordModal({ onSubmit, onClose }) {
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (!password.trim()) return;
    onSubmit(password);
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-[#121212] text-white rounded-xl p-5 w-[360px] border border-white/10 shadow-xl">

          <h2 className="text-base font-semibold mb-2">
            Encrypt File
          </h2>

          <p className="text-xs text-white/60 mb-4">
            This password will be required to download the file.
          </p>

          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full px-3 py-2 rounded-lg
              bg-white/10 border border-white/20
              outline-none
            "
            placeholder="Enter encryption password"
          />

          <div className="flex gap-2 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Encrypt & Upload
            </button>
          </div>

        </div>
      </div>
    </Portal>
  );
}
