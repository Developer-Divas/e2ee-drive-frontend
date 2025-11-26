'use client';

import React from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const r = useRouter();

  return (
    <aside className="w-64 bg-[rgba(255,255,255,0.02)] border-r border-[rgba(255,255,255,0.03)] min-h-screen p-4">
      <div className="mb-6">
        <div className="text-xs uppercase text-muted mb-2">My Drive</div>

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => r.push(`/dashboard?root=${Date.now()}`)}
            className="text-left py-2 px-3 rounded-md hover:bg-[rgba(255,255,255,0.02)]"
          >
            📁 Root
          </button>
        </nav>
      </div>

      <div className="mt-8 text-sm text-muted">Storage</div>
      <div className="mt-2">
        <div className="h-2 bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-teal-300"
            style={{ width: "28%" }}
          />
        </div>
        <div className="mt-2 text-xs text-muted">28% used</div>
      </div>
    </aside>
  );
}
