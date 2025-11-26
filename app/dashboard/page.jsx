'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import FolderCard from '@/components/FolderCard';
import CreateFolderModal from '@/components/CreateFolderModal';

export default function Dashboard() {
  const r = useRouter();
  const [folders, setFolders] = useState([]);
  const [parentId, setParentId] = useState(null);
  const [path, setPath] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  async function load(pid = null, newPath = null) {
    try {
      const data = await api.getFolders(pid);
      setFolders(data || []);
      setParentId(pid);
      if (newPath !== null) setPath(newPath);
    } catch (e) {
      r.push('/login');
    }
  }

  useEffect(() => {
    load(null, []);
    function handler() {
      setShowCreate(true);
    }
    window.addEventListener('open-create-folder', handler);
    return () => window.removeEventListener('open-create-folder', handler);
  }, []);

  async function openFolder(folder) {
    const updatedPath = [...path, { id: folder.id, name: folder.name }];
    await load(folder.id, updatedPath);
  }

  async function createFolder(name) {
    await api.createFolder(name, parentId);
    setShowCreate(false);
    load(parentId, path);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-muted text-sm">Path</div>
          <div className="text-lg font-semibold">
            Root{path.map(p => ` / ${p.name}`)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => { logout(); r.push('/login'); }}>Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {folders.map(f => (
          <FolderCard key={f.id} folder={f} onOpen={openFolder} />
        ))}
      </div>

      {showCreate && <CreateFolderModal onCreate={createFolder} onClose={() => setShowCreate(false)} />}
    </div>
  );
}
