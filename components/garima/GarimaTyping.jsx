"use client";

export default function GarimaTyping() {
  return (
    <div className="flex justify-start">
      <div className="
        bg-white/10 text-white/60
        px-3 py-2 rounded-lg
        text-sm flex items-center gap-2
      ">
        <span>Garima is thinking</span>
        <span className="flex gap-1">
          <Dot delay="0ms" />
          <Dot delay="150ms" />
          <Dot delay="300ms" />
        </span>
      </div>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="w-1 h-1 bg-white/60 rounded-full animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}
