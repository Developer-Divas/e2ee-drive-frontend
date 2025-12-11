'use client';

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* =========================================================
          DESKTOP SIDEBAR (always visible)
      ========================================================== */}
      <div className="hidden md:block w-64 h-full fixed left-0 top-0 border-r border-white/10 bg-[#0d0e12]">
        <Sidebar />
      </div>

      {/* =========================================================
          MOBILE SLIDING SIDEBAR
      ========================================================== */}
      <div
        className={`
          fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      <div
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0d0e12]
          border-r border-white/10 z-50 md:hidden
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </div>

      {/* =========================================================
          MAIN CONTENT AREA
      ========================================================== */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto md:ml-64">

        {/* NAVBAR with Mobile Menu Button */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* Page content */}
        <main className="px-6 pt-4 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
