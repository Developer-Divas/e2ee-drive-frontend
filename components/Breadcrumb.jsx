'use client';

export default function Breadcrumb({ items, onNavigate }) {
  return (
    <div className="flex gap-2 text-sm text-gray-300">
      {items.map((item, index) => (
        <span key={item.id || index} className="flex items-center">
          
          <button
            className="hover:underline hover:text-white transition"
            onClick={() => onNavigate(item.id)}
          >
            {item.name}
          </button>

          {index < items.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </div>
  );
}
