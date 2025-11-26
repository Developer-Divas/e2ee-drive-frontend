export default function FolderCard({ folder, onOpen }) {
  const count = folder.item_count ?? folder.itemCount ?? folder.count ?? 0;

  return (
    <div
      onClick={() => onOpen && onOpen(folder)}
      className="group cursor-pointer p-6 rounded-xl bg-[#1b1b2d] hover:bg-[#22223c] hover:shadow-xl transition-all border border-[#2a2a3d]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Folder Icon */}
          <div className="w-12 h-12 rounded-lg bg-[#2a2a44] flex items-center justify-center group-hover:bg-[#34345a] transition">
            <svg width="26" height="22" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6z" />
            </svg>
          </div>

          <div>
            <div className="font-semibold text-lg">{folder.name}</div>
            <div className="text-xs text-gray-400">Owner: you</div>
          </div>
        </div>

        <div className="text-sm text-gray-400">{count} {count === 1 ? "item" : "items"}</div>
      </div>
    </div>
  );
}
