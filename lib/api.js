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
    } catch {}

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

export default {
  getFolders: (parentId = null) =>
    request(`/folders${parentId ? `?parent_id=${parentId}` : ''}`),

  createFolder: (name, parentId = null) =>
    request('/folders', 'POST', { name, parent_id: parentId }),

  getAllFolders: () => request('/folders/all'),

  uploadFile, // ⭐ now available
};
