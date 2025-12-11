import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-screen flex overflow-hidden">

      {/* ⭐ FIXED LEFT SIDEBAR */}
      <div className="w-64 h-full fixed left-0 top-0 border-r border-white/10 bg-[#0d0e12]">
        <Sidebar />
      </div>

      {/* ⭐ SCROLLABLE CONTENT AREA */}
      <div className="ml-64 flex-1 h-full flex flex-col overflow-y-auto">

        {/* Sticky navbar */}
        <Navbar />

        {/* Page content (scrollable area) */}
        <main className="px-6 pt-4 pb-20">
          {children}
        </main>
      </div>

    </div>
  );
}
