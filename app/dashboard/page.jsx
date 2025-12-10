'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import FolderCard from '@/components/FolderCard';
import CreateFolderModal from '@/components/CreateFolderModal';
import Breadcrumb from '@/components/Breadcrumb';
import UploadFileModal from '@/components/UploadFileModal';
import FileCard from '@/components/FileCard';

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


  // Load folder + breadcrumb
  async function loadFolder(folderId = null) {
    try {
      const data = await api.getFolders(folderId);

      let bc = [{ id: null, name: "Root" }];

      if (data.path || data.parent_chain) {
        const chain = data.path ?? data.parent_chain;
        chain.forEach(p => {
          bc.push({ id: p.id, name: p.name });
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


  // Folder Create Modal Listener
  useEffect(() => {
    function open() {
      setShowCreate(true);
    }
    window.addEventListener("open-create-folder", open);
    return () => window.removeEventListener("open-create-folder", open);
  }, []);

  // Upload Modal Listener
  useEffect(() => {
    function openUpload() {
      setShowUpload(true);
    }
    window.addEventListener("open-upload-file", openUpload);
    return () => window.removeEventListener("open-upload-file", openUpload);
  }, []);

  // Root navigation
  useEffect(() => {
    if (rootParam) loadFolder(null);
  }, [rootParam]);

  // Initial load
  useEffect(() => {
    loadFolder(null);
  }, []);


  async function createFolder(name) {
    try {
      await api.createFolder(name, currentFolderId);
      setShowCreate(false);
      loadFolder(currentFolderId);
    } catch (err) {
      alert(err.message);
    }
  }

  function openFolder(folder) {
    loadFolder(folder.id);
  }

  async function handleDownload(file) {
    await api.downloadFile(currentFolderId ?? "root", file.name);
  }

  async function handleDelete(file) {
    await api.deleteFile(currentFolderId ?? "root", file.name);
    loadFolder(currentFolderId);
  }

  async function handleRename(file) {
    const newName = prompt("Enter new file name:", file.name);
    if (!newName) return;
    await api.renameFile(currentFolderId ?? "root", file.name, newName);
    loadFolder(currentFolderId);
  }


  // Folder actions
  async function handleFolderDelete(folder) {
    await api.deleteFolder(folder.id);
    loadFolder(currentFolderId);
  }

  async function handleFolderRename(folder) {
    const newName = prompt("Enter folder name:", folder.name);
    if (!newName) return;
    await api.renameFolder(folder.id, newName);
    loadFolder(currentFolderId);
  }

  async function handleFolderDownload(folder) {
    await api.downloadFolder(folder.id);
  }


  async function uploadFile(file) {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder_id", currentFolderId ?? "root");
      await api.uploadFile(form);
      setShowUpload(false);
      loadFolder(currentFolderId);
    } catch (err) {
      console.error("UPLOAD ERROR →", err);
    }
  }


  return (
    <div className="pt-4">

      {/* Sticky Breadcrumb Section */}
      <div className="sticky top-14 z-40 bg-[#0d0e12]/90 backdrop-blur-xl pb-3 border-b border-white/10">
        <Breadcrumb items={breadcrumb} onNavigate={handleBreadcrumbClick} />
      </div>

      {/* Folder Grid */}
      <div className="
        mt-6 
        grid gap-4 
        grid-cols-[repeat(auto-fill,minmax(160px,1fr))]
      ">
        {folders.map(f => (
          <FolderCard
            key={f.id}
            folder={f}
            onOpen={openFolder}
            onDelete={handleFolderDelete}
            onRename={handleFolderRename}
            onDownload={handleFolderDownload}
          />
        ))}
      </div>

      {/* Files Grid */}
      {files.length > 0 && (
        <div className="
          mt-10 
          grid gap-3 
          grid-cols-[repeat(auto-fill,minmax(130px,1fr))]
        ">
          {files.map(f => (
            <FileCard
              key={f.name}
              file={f}
              onOpen={() => console.log("OPEN", f)}
              onDownload={handleDownload}
              onDelete={handleDelete}
              onRename={handleRename}
            />
          ))}
        </div>
      )}

      {/* Modals */}
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
