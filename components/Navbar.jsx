'use client';

import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const r = useRouter();

  function openModal() {
    window.dispatchEvent(new CustomEvent("open-create-folder"));
  }

  async function handleLogout() {
    await logout();  // your logout function
    r.push("/login");
  }

  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-[rgba(255,255,255,0.03)]">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-xl font-bold">
          ED
        </div>
        <h1 className="text-lg font-semibold">E2EE Drive</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            openModal();
          }}
          className="px-3 py-1.5 rounded-md border border-blue-400/40 text-blue-300 
             hover:bg-blue-400/10 hover:border-blue-400/60 transition">
          + New Folder
        </button>

        {/* 🔥 SIGN OUT BUTTON */}
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-md border border-red-500/40 text-red-300 hover:bg-red-500/10 hover:text-red-200 transition"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
