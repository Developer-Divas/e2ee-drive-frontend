"use client";

import { useState } from "react";
import Portal from "./Portal";

export default function RenameFolderModal({ folder, onRename, onClose }) {
  const [name, setName] = useState(folder.name);

  function handleRename() {
    const trimmed = name.trim();
    if (!trimmed || trimmed === folder.name) return;
    onRename(trimmed);
  }

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-[#121212] text-white rounded-xl p-5 w-[360px] border border-white/10 shadow-xl">

          <h2 className="text-base font-semibold mb-4">
            Rename Folder
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            className="
              w-full px-3 py-2 rounded-lg
              bg-white/10 border border-white/20
              outline-none
            "
          />

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
