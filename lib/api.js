import { getToken } from './auth';

const API = 'http://localhost:8000';

async function request(path, method = 'GET', body = null) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(API + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    let error = {};
    try {
      error = await response.json();
    } catch { }

    throw new Error(error.detail || 'API error');
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// 🚀 FILE UPLOAD (multipart/form-data)
async function uploadFile(form) {
  const token = getToken();

  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(API + '/upload', {
    method: 'POST',
    headers, // DO NOT send content-type explicitly
    body: form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Upload failed');
  }

  return res.json();
}

async function downloadFile(folderId, name) {
  const token = getToken();

  const res = await fetch(`${API}/download/${folderId}/${name}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
}

async function deleteFile(folderId, name) {
  const token = getToken();

  await fetch(`${API}/delete/${folderId}/${name}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
}


async function renameFile(folderId, oldName, newName) {
  const token = getToken();

  await fetch(`${API}/rename/${folderId}/${oldName}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ new_name: newName })
  });
}

async function deleteFolder(id) {
  return request(`/folder/${id}`, "DELETE");
}

async function renameFolder(id, newName) {
  return request(`/folder/${id}/rename`, "POST", { new_name: newName });
}

async function downloadFolder(id) {
  const token = getToken();
  const res = await fetch(`${API}/folder/${id}/download`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "folder.zip";
  a.click();
}


export default {
  getFolders: (parentId = null) =>
    request(`/folders${parentId ? `?parent_id=${parentId}` : ''}`),

  createFolder: (name, parentId = null) =>
    request('/folders', 'POST', { name, parent_id: parentId }),

  getAllFolders: () => request('/folders/all'),

  uploadFile, // ⭐ now available
  downloadFile,
  deleteFile,
  renameFile,
  deleteFolder,
  renameFolder,
  downloadFolder,

};
