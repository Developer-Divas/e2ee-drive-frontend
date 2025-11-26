'use client';

export default function Navbar() {
  function openModal() {
    window.dispatchEvent(new CustomEvent("open-create-folder"));
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
          onClick={openModal}
          className="btn border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)]"
        >
          + New Folder
        </button>
      </div>
    </header>
  );
}
