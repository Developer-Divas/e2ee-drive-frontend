'use client';
import React, { useState } from 'react';

export default function CreateFolderModal({ onCreate, onClose }) {
  const [name, setName] = useState('');
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-surface card w-96 z-10">
        <h3 className="text-lg font-semibold mb-2">Create Folder</h3>
        <input className="input w-full mb-3" value={name} onChange={(e) => setName(e.target.value)} placeholder="Folder name" />
        <div className="flex justify-end gap-2">
          <button className="btn" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={() => { if(name.trim()) { onCreate(name.trim()); setName(''); } }}>Create</button>
        </div>
      </div>
    </div>
  );
}
