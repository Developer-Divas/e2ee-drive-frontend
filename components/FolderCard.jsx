"use client";

import { useState, useRef, useEffect } from "react";
import { Folder, MoreVertical, Download, Trash2, Pencil } from "lucide-react";

export default function FolderCard({ folder, onOpen, onDelete, onRename, onDownload }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
      className="group relative bg-white/5 hover:bg-white/10
                 border border-white/10 hover:border-white/20
                 p-3 rounded-xl cursor-pointer transition-all shadow-md
                 hover:shadow-lg hover:scale-[1.015] backdrop-blur-md"
      onClick={() => !menuOpen && onOpen(folder)}
    >
      {/* Menu button */}
      <button
        className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-white/20 z-20"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <MoreVertical size={16} />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-2 top-8 w-32 
               bg-black/90 backdrop-blur-xl
               rounded-lg border border-white/10 shadow-2xl
               p-1.5 z-[9999] overflow-visible space-y-1"
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem
            icon={<Pencil size={14} />}
            label="Rename"
            onClick={() => {
              setMenuOpen(false);
              onRename(folder);
            }}
          />

          <MenuItem
            icon={<Download size={14} />}
            label="Download"
            onClick={() => {
              setMenuOpen(false);
              onDownload(folder);
            }}
          />

          <MenuItem
            icon={<Trash2 size={14} className="text-red-400" />}
            label="Delete"
            className="text-red-400"
            onClick={() => {
              setMenuOpen(false);
              onDelete(folder);
            }}
          />
        </div>
      )}


      {/* Icon */}
      <Folder size={36} className="text-yellow-300 mb-2" />

      {/* Premium Folder Name */}
      <div className="truncate text-[13px] font-medium text-white/95 tracking-tight drop-shadow-sm">
        {folder.name}
      </div>


    </div>
  );
}

function MenuItem({ icon, label, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center gap-2 w-full 
                  px-2 py-1 rounded-md text-xs 
                  hover:bg-white/10 transition ${className}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

