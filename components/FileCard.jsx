"use client";

import { useState, useRef, useEffect } from "react";
import { getFileIcon } from "./FileIcons";
import { MoreVertical, Download, Trash2, Pencil } from "lucide-react";

export default function FileCard({ file, onOpen, onDownload, onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const Icon = getFileIcon(file.name);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className="
        relative group cursor-pointer
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        p-2.5 rounded-lg
        shadow-sm hover:shadow-md
        transition-all backdrop-blur-md
      "
      onClick={() => !menuOpen && onOpen(file)}
    >
      {/* MENU BUTTON */}
      <button
        className="absolute top-1.5 right-1.5 p-1 rounded-md hover:bg-white/20 z-20"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <MoreVertical size={14} />
      </button>

      {/* MENU */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="
            absolute right-1.5 top-8 w-28 
            bg-black/90 backdrop-blur-xl 
            rounded-md border border-white/10 
            shadow-xl p-1.5 z-[9999] space-y-0.5
          "
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem label="Rename" icon={<Pencil size={12} />} onClick={() => { setMenuOpen(false); onRename(file); }} />
          <MenuItem label="Download" icon={<Download size={12} />} onClick={() => { setMenuOpen(false); onDownload(file); }} />
          <MenuItem label="Delete" className="text-red-400" icon={<Trash2 size={12} className="text-red-400" />} onClick={() => { setMenuOpen(false); onDelete(file); }} />
        </div>
      )}

      {/* FILE ICON */}
      <Icon size={26} className="text-white/90 mb-1" />

      {/* FILE NAME */}
      <div className="truncate text-[12px] font-medium text-white/95 tracking-tight">
        {file.name}
      </div>

      {/* FILE SIZE */}
      <div className="text-[10px] text-white/50">
        {formatSize(file.size)}
      </div>
    </div>
  );
}

function MenuItem({ icon, label, className = "", onClick }) {
  return (
    <button
      className={`
        flex items-center gap-2 w-full
        px-2 py-[5px] rounded 
        text-[11px] hover:bg-white/10 transition
        ${className}
      `}
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

function formatSize(bytes) {
  if (!bytes) return "0 KB";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}
