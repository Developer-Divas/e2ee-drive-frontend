import { useState } from "react";
import Portal from "./Portal";

export default function RenameFileModal({ file, onRename, onClose }) {
  const parts = file.name.split(".");
  const baseName =
    parts.length > 2 ? parts.slice(0, -2).join(".") : parts[0];
  const extension =
    parts.length > 2 ? "." + parts.slice(-2).join(".") : "." + parts.slice(1).join(".");

  const [name, setName] = useState(baseName);

  function handleRename() {
    if (!name.trim()) return;
    onRename(name + extension);
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-[#121212] text-white rounded-xl p-5 w-[380px] border border-white/10 shadow-xl">

          <h2 className="text-base font-semibold mb-4">Rename File</h2>

          <div className="space-y-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
              autoFocus
            />

            <div className="text-sm text-gray-400">
              Extension locked: <span className="text-gray-300">{extension}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20"
            >
              Cancel
            </button>
            <button
              onClick={handleRename}
              className="flex-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
            >
              Rename
            </button>
          </div>

        </div>
      </div>
    </Portal>
  );
}
