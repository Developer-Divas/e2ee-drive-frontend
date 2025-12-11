"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const r = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* -------- Mobile Hamburger Button -------- */}
      <button
        className="lg:hidden p-2 fixed top-4 left-4 z-50 bg-white/5 rounded-md border border-white/10"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} className="text-white" />
      </button>

      {/* -------- Sidebar Drawer -------- */}
      <aside
        className={`
          fixed top-0 left-0 h-full 
          bg-[rgba(255,255,255,0.02)] 
          border-r border-[rgba(255,255,255,0.03)]
          p-4 w-64 z-40
          backdrop-blur-xl
          transition-transform duration-300 
          ${open ? "translate-x-0" : "-translate-x-full"}   /* Mobile */
          lg:translate-x-0                               /* Desktop */
        `}
      >
        {/* Close button for Mobile */}
        <button
          className="lg:hidden mb-4 text-white text-xl"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <div className="mb-6">
          <div className="text-xs uppercase text-muted mb-2">My Drive</div>

          <nav className="flex flex-col gap-2">
            <button
              onClick={() => {
                setOpen(false);
                r.push(`/dashboard?root=${Date.now()}`);
              }}
              className="text-left py-2 px-3 rounded-md hover:bg-[rgba(255,255,255,0.04)] transition"
            >
              📁 Root
            </button>
          </nav>
        </div>

        <div className="mt-8 text-sm text-muted">Storage</div>

        <div className="mt-2">
          <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-teal-300"
              style={{ width: "28%" }}
            />
          </div>
          <div className="mt-2 text-xs text-muted">28% used</div>
        </div>
      </aside>

      {/* -------- Overlay (when sidebar opened on mobile) -------- */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
