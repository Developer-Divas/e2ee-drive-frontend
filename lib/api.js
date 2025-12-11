import { getToken } from "./auth";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ============================================================
   GENERIC REQUEST WRAPPER (JSON APIs)
============================================================ */
async function request(path, method = "GET", body = null) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    let err = {};
    try {
      err = await res.json();
    } catch { }
    throw new Error(err.detail || "API error");
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/* ============================================================
   FILE UPLOAD → SUPABASE STORAGE
============================================================ */
async function uploadFile(form) {
  const token = getToken();

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API + "/upload", {
    method: "POST",
    headers,  // DO NOT set content-type manually
    body: form,
  });

  if (!res.ok) {
    let e = await res.json().catch(() => ({}));
    throw new Error(e.detail || "Upload failed");
  }

  return res.json();
}

/* ============================================================
   FILE DOWNLOAD → SIGNED SUPABASE URL
============================================================ */
async function downloadFile(folderId, filename) {
  const token = getToken();

  const res = await fetch(`${API}/download/${folderId}/${filename}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    console.error(await res.text());
    return;
  }

  const data = await res.json(); // { url: "signed-url" }
  window.open(data.url, "_blank");
}

/* ============================================================
   DELETE FILE (Remove from Supabase)
============================================================ */
async function deleteFile(folderId, filename) {
  const token = getToken();

  await fetch(`${API}/delete/${folderId}/${filename}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ============================================================
   RENAME FILE (Supabase: copy → delete → new name)
============================================================ */
async function renameFile(folderId, oldName, newName) {
  const token = getToken();

  await fetch(`${API}/rename/${folderId}/${oldName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ new_name: newName }),
  });
}

/* ============================================================
   FOLDER OPERATIONS
============================================================ */
async function deleteFolder(id) {
  return request(`/folder/${id}`, "DELETE");
}

async function renameFolder(id, newName) {
  return request(`/folder/${id}/rename`, "POST", { new_name: newName });
}

/* Folder download NOT supported (backend returns 501) */
async function downloadFolder(id) {
  const token = getToken();

  const res = await fetch(`${API}/folder/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(err);
    alert("Folder ZIP download failed: " + err);
    return;
  }

  // Response is ZIP blob
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "folder.zip"; // backend already names file correctly
  a.click();
}


/* ============================================================
   EXPORT PUBLIC API
============================================================ */
export default {
  getFolders: (parentId = null) =>
    request(`/folders${parentId ? `?parent_id=${parentId}` : ""}`),

  createFolder: (name, parentId = null) =>
    request("/folders", "POST", { name, parent_id: parentId }),

  getAllFolders: () => request("/folders/all"),

  uploadFile,
  downloadFile,
  deleteFile,
  renameFile,

  deleteFolder,
  renameFolder,
  downloadFolder,
};
