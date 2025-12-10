"use client";

import { useState, useRef, useEffect } from "react";
import PopupPortal from "./PopupPortal";
import { getFileIcon } from "./FileIcons";
import { MoreVertical, Download, Trash2, Pencil } from "lucide-react";

export default function FileCard({ file, onOpen, onDownload, onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const Icon = getFileIcon(file.name);

  // Close menu only when clicking outside BOTH button AND menu
  useEffect(() => {
    function handleClick(e) {
      if (
        !btnRef.current?.contains(e.target) &&
        !menuRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Position popup
  useEffect(() => {
    if (menuOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();

      setMenuPos({
        top: rect.bottom + 6,
        left: rect.right - 140
      });
    }
  }, [menuOpen]);

  return (
    <div
      className="
        relative group cursor-pointer
        bg-white/5 hover:bg-white/10
        border border-white/10 hover:border-white/20
        p-3 rounded-lg
        shadow-sm hover:shadow-md
        transition-all backdrop-blur-md
      "
      onClick={() => !menuOpen && onOpen(file)}
    >
      {/* THREE DOTS */}
      <button
        ref={btnRef}
        className="absolute top-2 right-2 p-1.5 rounded-md hover:bg-white/20 z-20"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <MoreVertical size={16} />
      </button>

      {/* MENU PORTAL */}
      {menuOpen && (
        <PopupPortal>
          <div
            ref={menuRef}
            className="
              fixed z-[999999]
              bg-black/90 backdrop-blur-xl
              border border-white/10
              rounded-md shadow-xl
              w-32 py-2
            "
            style={{
              top: menuPos.top,
              left: menuPos.left
            }}
          >
            <MenuItem
              label="Rename"
              icon={<Pencil size={12} />}
              onClick={() => {
                setMenuOpen(false);
                onRename(file);
              }}
            />

            <MenuItem
              label="Download"
              icon={<Download size={12} />}
              onClick={() => {
                setMenuOpen(false);
                onDownload(file);
              }}
            />

            <MenuItem
              label="Delete"
              className="text-red-400"
              icon={<Trash2 size={12} className="text-red-400" />}
              onClick={() => {
                setMenuOpen(false);
                onDelete(file);
              }}
            />
          </div>
        </PopupPortal>
      )}

      {/* FILE ICON */}
      <Icon size={28} className="text-white/90 mb-2" />

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

function MenuItem({ icon, label, onClick, className = "" }) {
  return (
    <button
      className={`
        flex items-center gap-2 w-full
        px-3 py-1.5 rounded
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
