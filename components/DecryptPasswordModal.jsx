import { useState } from "react";
import Portal from "./Portal";

export default function DecryptPasswordModal({ onSubmit, onClose, error }) {
  const [password, setPassword] = useState("");

  function handleSubmit() {
    if (!password) return;
    onSubmit(password);
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-[#121212] text-white rounded-xl p-5 w-[380px] border border-white/10 shadow-xl">

          <h2 className="text-base font-semibold mb-4">Decrypt File</h2>

          <input
            type="password"
            placeholder="Enter encryption password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
            autoFocus
          />

          {error && (
            <div className="text-red-400 text-sm mt-2">
              ❌ Wrong password. Unable to decrypt file.
            </div>
          )}

          <div className="flex gap-2 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-2 rounded-lg bg-green-600 hover:bg-green-700"
            >
              Decrypt & Download
            </button>
          </div>

        </div>
      </div>
    </Portal>
  );
}
