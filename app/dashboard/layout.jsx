import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-[#0d0e12] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 min-h-screen bg-[#0d0e12]">
          {children}
        </main>
      </div>
    </div>
  );
}
