'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { logout } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import FolderCard from '@/components/FolderCard';
import CreateFolderModal from '@/components/CreateFolderModal';
import Breadcrumb from '@/components/Breadcrumb';
import UploadFileModal from '@/components/UploadFileModal';

export default function Dashboard() {
  const r = useRouter();
  const searchParams = useSearchParams();
  const rootParam = searchParams.get("root");

  const [folders, setFolders] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [files, setFiles] = useState([]);


  // ---------------------------
  // Load folder + breadcrumb
  // ---------------------------
  async function loadFolder(folderId = null) {
    try {
      const data = await api.getFolders(folderId);

      let bc = [{ id: null, name: "Root" }];

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
      setFolders(data.folders || data);
      setFiles(data.files || []);
      setCurrentFolderId(folderId);
    } catch (err) {
      console.error(err);
      r.push('/login');
    }
  }

  function handleBreadcrumbClick(folderId) {
    loadFolder(folderId);
  }

  // 1️⃣ Modal listener → ALWAYS once.
  useEffect(() => {
    function open() {
      console.log("EVENT RECEIVED");
      setShowCreate(true);
    }

    window.addEventListener("open-create-folder", open);
    return () => window.removeEventListener("open-create-folder", open);
  }, []);

  // 2️⃣ Root reload → whenever rootParam changes
  useEffect(() => {
    if (rootParam) {
      console.log("ROOT TRIGGERED →", rootParam);
      loadFolder(null);
    }
  }, [rootParam]);

  // 3️⃣ Initial folder load → once
  useEffect(() => {
    console.log("INITIAL LOAD → ROOT");
    loadFolder(null);
  }, []);


  useEffect(() => {
    function openUpload() {
      console.log("UPLOAD MODAL OPENED");
      setShowUpload(true);
    }

    window.addEventListener("open-upload-file", openUpload);
    return () => window.removeEventListener("open-upload-file", openUpload);
  }, []);


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

  async function uploadFile(file) {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder_id", currentFolderId);

      await api.uploadFile(form);

      setShowUpload(false);
      loadFolder(currentFolderId); // refresh after upload
    } catch (err) {
      console.error("UPLOAD ERROR →", err);
    }
  }


  return (
    <div>
      <Breadcrumb items={breadcrumb} onNavigate={handleBreadcrumbClick} />

      <div className="mt-6 grid grid-cols-3 gap-6">
        {folders.map(f => (
          <FolderCard key={f.id} folder={f} onOpen={openFolder} />
        ))}
      </div>

      <div className="mt-10 grid grid-cols-3 gap-6">
        {files.map(f => (
          <div key={f.name} className="p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="text-4xl">📄</div>
            <div className="truncate mt-2">{f.name}</div>
          </div>
        ))}
      </div>

      {showCreate && (
        <CreateFolderModal
          onCreate={createFolder}
          onClose={() => setShowCreate(false)}
        />
      )}

      {showUpload && (
        <UploadFileModal
          onUpload={uploadFile}
          onClose={() => setShowUpload(false)}
        />
      )}

    </div>
  );
}
