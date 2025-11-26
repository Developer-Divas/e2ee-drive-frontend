'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { logout } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import FolderCard from '@/components/FolderCard';
import CreateFolderModal from '@/components/CreateFolderModal';
import Breadcrumb from '@/components/Breadcrumb';

export default function Dashboard() {
  const r = useRouter();

  const [folders, setFolders] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  // ---------------------------
  // Load folder + build breadcrumb
  // ---------------------------
  async function loadFolder(folderId = null) {
    try {
      const data = await api.getFolders(folderId);

      console.log("FOLDER RESPONSE:", data);
      // Build breadcrumb array
      let bc = [{ id: null, name: "Root" }];

      // If backend returns parent chain, adjust name
      if (data.path || data.parent_chain) {
        const chain = data.path ?? data.parent_chain;

        chain.forEach(p => {
          bc.push({
            id: p.id,
            name: p.name
          });
        });
      }

      setBreadcrumb(bc);
      setFolders(data.folders || data); // adjust depending backend
      setCurrentFolderId(folderId);
    } catch (err) {
      console.error(err);
      r.push('/login');
    }
  }

  // ---------------------------
  // Breadcrumb click handler
  // ---------------------------
  function handleBreadcrumbClick(folderId) {
    loadFolder(folderId);
  }

  // ---------------------------
  // On Mount
  // ---------------------------

const searchParams = useSearchParams();
const rootParam = searchParams.get("root");


useEffect(() => {
  // If root button clicked → load root
  if (rootParam) {
    console.log("ROOT TRIGGERED →", rootParam);
    loadFolder(null);
    return;
  }

  // IF NO root param AND no folder loaded yet → load root once
  if (currentFolderId === null && folders.length === 0) {
    console.log("INITIAL LOAD → ROOT");
    loadFolder(null);
  }
}, [rootParam]);



  // ---------------------------
  // Create folder
  // ---------------------------
  async function createFolder(name) {
    await api.createFolder(name, currentFolderId);
    setShowCreate(false);
    loadFolder(currentFolderId);
  }

  // ---------------------------
  // Open folder
  // ---------------------------
  function openFolder(folder) {
    loadFolder(folder.id);
  }

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumb} onNavigate={handleBreadcrumbClick} />

      {/* Folder Grid */}
      <div className="mt-6 grid grid-cols-3 gap-6">
        {folders.map(f => (
          <FolderCard key={f.id} folder={f} onOpen={openFolder} />
        ))}
      </div>

      {/* Modal */}
      {showCreate && (
        <CreateFolderModal
          onCreate={createFolder}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}
