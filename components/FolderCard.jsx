'use client';
import React from 'react';

export default function FolderCard({ folder, onOpen }) {
  return (
    <div
      onClick={() => onOpen(folder)}
      className="card hover:shadow-lifted cursor-pointer transition-all duration-150"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-2xl">📁</div>
          <div>
            <div className="font-medium">{folder.name}</div>
            <div className="text-xs text-muted mt-1">Owner: you</div>
          </div>
        </div>
        <div className="text-sm text-muted">3 items</div>
      </div>
    </div>
  );
}
