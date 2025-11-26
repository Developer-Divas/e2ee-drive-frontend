'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const r = useRouter();
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState('');
  const [parentId, setParentId] = useState(null);
  const [path, setPath] = useState([]); // <-- breadcrumb path

  async function load(pid = null, newPath = null) {
    try {
      const data = await api.getFolders(pid);
      setFolders(data);
      setParentId(pid);

      if (newPath !== null) setPath(newPath);
    } catch (e) {
      r.push('/login');
    }
  }

  // When clicking folder:
  async function openFolder(folder) {
    const updatedPath = [...path, { id: folder.id, name: folder.name }];
    await load(folder.id, updatedPath);
  }

  // Clicking breadcrumb:
  async function goToLevel(idx) {
    if (idx === -1) {
      load(null, []);
      return;
    }

    const level = path[idx];
    const newPath = path.slice(0, idx + 1);
    await load(level.id, newPath);
  }

  useEffect(() => {
    load(null, []);
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

      {/* BREADCRUMB */}
      <div style={{ margin: "20px 0", fontSize: "18px" }}>
        <span
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => goToLevel(-1)}
        >
          Root
        </span>

        {path.map((p, i) => (
          <span key={p.id}>
            {" / "}
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => goToLevel(i)}
            >
              {p.name}
            </span>
          </span>
        ))}
      </div>

      {/* CREATE FOLDER */}
      <div style={{ marginBottom: 20 }}>
        <input
          value={newFolder}
          onChange={(e) => setNewFolder(e.target.value)}
        />
        <button
          onClick={async () => {
            await api.createFolder(newFolder, parentId);
            setNewFolder('');
            load(parentId, path);
          }}
        >
          Create
        </button>
      </div>

      {/* LIST OF FOLDERS */}
      <ul>
        {folders.map((f) => (
          <li
            key={f.id}
            style={{
              cursor: 'pointer',
              padding: 5,
              borderBottom: '1px solid #ccc',
            }}
            onClick={() => openFolder(f)}
          >
            📁 {f.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
