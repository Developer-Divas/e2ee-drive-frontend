import { Suspense } from "react";
import Dashboard from "./Dashboard";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-white">Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
