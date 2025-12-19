"use client";

import { useState, useRef, useEffect } from "react";
import { Folder, MoreVertical, Download, Trash2, Pencil } from "lucide-react";
import PopupPortal from "./PopupPortal";
import RenameFolderModal from "./RenameFolderModal";


export default function FolderCard({ folder, onOpen, onDelete, onRename, onDownload }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const [showRename, setShowRename] = useState(false);


  const btnRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside BOTH button and menu
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

  // Position the popup
  useEffect(() => {
    if (menuOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 6,
        left: rect.right - 150
      });
    }
  }, [menuOpen]);

  return (
    <div
      className="group relative bg-white/5 hover:bg-white/10
                 border border-white/10 hover:border-white/20
                 p-3 rounded-xl cursor-pointer transition-all shadow-md
                 hover:shadow-lg hover:scale-[1.015] backdrop-blur-md"
      onClick={() => !menuOpen && onOpen(folder)}
    >
      {/* 3 dots */}
      <button
        ref={btnRef}
        className="absolute top-2 right-2 p-1.5 rounded-lg hover:bg-white/20 z-20"
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
              fixed
              z-[999999]
              bg-[#141519]
              border border-white/10
              rounded-xl
              shadow-xl
              w-40 py-2
            "
            style={{
              top: menuPos.top,
              left: menuPos.left,
            }}
          >
            <MenuItem
              icon={<Pencil size={14} />}
              label="Rename"
              onClick={() => {
                setMenuOpen(false);
                setShowRename(true);
              }}
            />

            {/* <MenuItem
              icon={<Download size={14} />}
              label="Download"
              onClick={() => {
                setMenuOpen(false);
                onDownload(folder);
              }}
            /> */}

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
        </PopupPortal>
      )}

      {/* Folder icon */}
      <Folder size={36} className="text-yellow-300 mb-2" />

      {/* Folder name */}
      <div className="truncate text-[13px] font-medium text-white/95 tracking-tight">
        {folder.name}
      </div>

      {showRename && (
        <RenameFolderModal
          folder={folder}
          onRename={(newName) => {
            onRename(folder, newName);
            setShowRename(false);
          }}
          onClose={() => setShowRename(false)}
        />
      )}

    </div>
  );
}

function MenuItem({ icon, label, onClick, className = "" }) {
  return (
    <button
      className={`flex items-center gap-2 w-full 
                  px-3 py-1.5 rounded-md text-xs
                  hover:bg-white/10 transition ${className}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
