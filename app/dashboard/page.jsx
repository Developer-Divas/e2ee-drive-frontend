'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const r = useRouter();
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [parentId, setParentId] = useState(null); // <-- track current folder

  async function load(pid = null) {
    try {
      const data = await api.getFolders(pid);
      setFolders(data);
      setParentId(pid);
    } catch (e) {
      console.error(e);
      r.push('/login');
    }
  }

  useEffect(() => {
    load(null);
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>Dashboard</h1>

      <button
        onClick={() => {
          logout();
          r.push('/login');
        }}
      >
        Logout
      </button>

      {parentId !== null && (
        <button onClick={() => load(null)} style={{ marginLeft: 20 }}>
          ⬅ Back
        </button>
      )}

      <div style={{ marginTop: 20 }}>
        <input
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button
          onClick={async () => {
            await api.createFolder(newFolder, parentId);
            setNewFolder('');
            load(parentId);
          }}
        >
          Create
        </button>
      </div>

      <ul style={{ marginTop: 20 }}>
        {folders.map((f) => (
          <li
            key={f.id}
            style={{
              cursor: 'pointer',
              padding: 5,
              borderBottom: '1px solid #ccc'
            }}
            onClick={() => load(f.id)} // <-- CLICK loads subfolders
          >
            📁 {f.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
