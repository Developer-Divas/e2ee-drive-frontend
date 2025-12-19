"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import FolderCard from '@/components/FolderCard';
import CreateFolderModal from '@/components/CreateFolderModal';
import Breadcrumb from '@/components/Breadcrumb';
import UploadFileModal from '@/components/UploadFileModal';
import FileCard from '@/components/FileCard';

import { encryptFile, decryptFile } from "@/lib/crypto";
import { getToken } from "@/lib/auth";


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

  async function loadFolder(folderId = null) {
    try {
      const data = await api.getFolders(folderId);

      let bc = [{ id: null, name: "Root" }];

      if (data.path || data.parent_chain) {
        const chain = data.path ?? data.parent_chain;
        chain.forEach(p => bc.push({ id: p.id, name: p.name }));
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

  useEffect(() => {
    function open() { setShowCreate(true); }
    window.addEventListener("open-create-folder", open);
    return () => window.removeEventListener("open-create-folder", open);
  }, []);

  useEffect(() => {
    function openUpload() { setShowUpload(true); }
    window.addEventListener("open-upload-file", openUpload);
    return () => window.removeEventListener("open-upload-file", openUpload);
  }, []);

  useEffect(() => {
    if (rootParam) loadFolder(null);
  }, [rootParam]);

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
    const password = prompt("Enter encryption password");
    if (!password) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/download/${currentFolderId ?? "root"}/${file.name}`,
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );

    const { url } = await res.json();
    const encryptedBlob = await fetch(url).then(r => r.blob());

    if (!file.meta) {
      alert("Encryption metadata missing. Cannot decrypt this file.");
      return;
    }

    const meta =
      typeof file.meta === "string"
        ? JSON.parse(file.meta)
        : file.meta;

    try {
      const decryptedBlob = await decryptFile(encryptedBlob, password, meta);

      const a = document.createElement("a");
      a.href = URL.createObjectURL(decryptedBlob);
      a.download = meta.originalName;
      a.click();

    } catch (err) {
      if (err.message === "DECRYPT_FAILED") {
        alert("❌ Wrong password. Please try again.");
      } else {
        alert("❌ Decryption failed due to an unexpected error.");
      }
    }

  }


  async function handleDelete(file) {
    await api.deleteFile(currentFolderId ?? "root", file.name);
    loadFolder(currentFolderId);
  }

  function getBaseName(filename) {
    const parts = filename.split(".");
    if (parts.length <= 2) return parts[0];
    // e.g. report.pdf.enc → ["report","pdf","enc"]
    return parts.slice(0, parts.length - 2).join(".");
  }

  function getLockedExtension(filename) {
    const parts = filename.split(".");
    if (parts.length <= 2) return "." + parts.slice(1).join(".");
    return "." + parts.slice(-2).join(".");
  }

  async function handleRename(file) {
    const base = getBaseName(file.name);
    const ext = getLockedExtension(file.name);

    const input = prompt(
      `Rename file (extension locked: ${ext})`,
      base
    );

    if (!input) return;

    const newName = input + ext;
    await api.renameFile(currentFolderId ?? "root", file.name, newName);
    loadFolder(currentFolderId);
  }

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
      const password = prompt("Set encryption password");
      if (!password) return;

      const { encryptedBlob, meta } = await encryptFile(file, password);

      const encryptedFile = new File(
        [encryptedBlob],
        file.name + ".enc",
        { type: "application/octet-stream" }
      );

      const form = new FormData();
      form.append("file", encryptedFile);
      form.append("folder_id", currentFolderId ?? "root");
      form.append("meta", JSON.stringify(meta));

      await api.uploadFile(form);

      setShowUpload(false);
      loadFolder(currentFolderId);
    } catch (e) {
      console.error("UPLOAD FAILED", e);
    }
  }


  return (
    <div className="pt-4">

      <div
        className="
          sticky top-14 z-40
          bg-[#0d0e12]/85 backdrop-blur-xl
          border-b border-white/5
        "
      >
        <div className="px-1 py-1">
          <Breadcrumb items={breadcrumb} onNavigate={handleBreadcrumbClick} />
        </div>
      </div>

      <div className="mt-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
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

      {files.length > 0 && (
        <div className="mt-10 grid gap-3 grid-cols-[repeat(auto-fill,minmax(130px,1fr))]">
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
