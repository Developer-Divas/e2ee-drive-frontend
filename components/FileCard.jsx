'use client';

import { getFileIcon } from "./FileIcons";
import { Download, Trash2, Pencil } from "lucide-react";
import { useState } from "react";

export default function FileCard({ file, onOpen, onDownload, onDelete, onRename }) {
  const Icon = getFileIcon(file.name);
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      onClick={() => onOpen?.(file)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="
        relative group cursor-pointer p-4 rounded-xl
        bg-[rgba(255,255,255,0.04)]
        backdrop-blur-xl
        border border-white/10
        shadow-[0_0_20px_rgba(0,0,0,0.2)]
        hover:bg-[rgba(255,255,255,0.10)]
        transition-all duration-200
        hover:scale-[1.03]
        hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]
      "
    >
      {/* File Icon */}
      <div className="mb-3 text-white">
        <Icon size={38} className="group-hover:scale-110 transition transform" />
      </div>

      {/* File name */}
      <div className="font-medium text-sm truncate">{file.name}</div>

      {/* Size + date */}
      <div className="text-xs text-white/60 mt-1">
        {formatSize(file.size || 0)}
      </div>

      {/* Hover action buttons */}
      {showActions && (
        <div className="
          absolute top-3 right-3 flex gap-2
          bg-black/40 p-1 rounded-lg backdrop-blur-md
          border border-white/10
        ">
          <button onClick={(e) => { e.stopPropagation(); onDownload?.(file); }}>
            <Download size={18} className="hover:text-blue-400" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); onRename?.(file); }}>
            <Pencil size={18} className="hover:text-green-400" />
          </button>

          <button onClick={(e) => { e.stopPropagation(); onDelete?.(file); }}>
            <Trash2 size={18} className="hover:text-red-400" />
          </button>
        </div>
      )}
    </div>
  );
}

function formatSize(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
