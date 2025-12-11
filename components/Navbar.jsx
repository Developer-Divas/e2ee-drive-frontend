"use client";

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react"; // Hamburger icon for mobile

export default function Navbar() {
  const r = useRouter();

  function openCreateFolder() {
    window.dispatchEvent(new CustomEvent("open-create-folder"));
  }

  function openUploadModal() {
    window.dispatchEvent(new CustomEvent("open-upload-file"));
  }

  async function handleLogout() {
    await logout();
    r.push("/login");
  }

  return (
    <header
      className="
        h-14 px-4 sm:px-6 flex items-center justify-between
        border-b border-white/10
        bg-[#0d0e12]/80 backdrop-blur-xl
        sticky top-0 z-50
        shadow-[0_2px_10px_rgba(0,0,0,0.35)]
      "
    >
      {/* LEFT SECTION — LOGO + MOBILE MENU */}
      <div className="flex items-center gap-4">

        {/* Hamburger (Mobile Only) */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-white/10"
          onClick={() =>
            document.body.dispatchEvent(new CustomEvent("toggle-sidebar"))
          }
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.05)]
                          flex items-center justify-center text-[15px] font-bold">
            ED
          </div>

          <span className="hidden sm:block text-lg font-semibold">
            E2EE Drive
          </span>
        </div>
      </div>

      {/* RIGHT SECTION — ACTION BUTTONS */}
      <div className="flex items-center gap-2 sm:gap-3">

        {/* + New Folder */}
        <button
          onClick={openCreateFolder}
          className="hidden sm:block px-3 py-1.5 rounded-md
                     border border-blue-400/40 text-blue-300
                     hover:bg-blue-400/10 hover:border-blue-400/60 
                     transition text-sm"
        >
          + New Folder
        </button>

        {/* Upload File */}
        <button
          onClick={openUploadModal}
          className="hidden sm:block px-3 py-1.5 rounded-md
                     border border-white/20 text-white/90
                     hover:bg-white/10 hover:border-white/30 
                     transition text-sm"
        >
          ↑ Upload
        </button>

        {/* Sign Out */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-md border border-red-500/40
                     text-red-300 hover:bg-red-500/10 hover:text-red-200
                     transition text-sm"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
