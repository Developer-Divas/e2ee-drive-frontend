// /lib/crypto.js

const enc = new TextEncoder();

/* =========================
   KEY DERIVATION
========================= */
async function deriveKey(password, salt) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/* =========================
   ENCRYPT
========================= */
export async function encryptFile(file, password) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));

  const key = await deriveKey(password, salt);
  const data = await file.arrayBuffer();

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  return {
    encryptedBlob: new Blob([encrypted], {
      type: "application/octet-stream",
    }),
    meta: {
      iv: Array.from(iv),
      salt: Array.from(salt),
      originalName: file.name,
      mime: file.type,
      size: file.size,
      algo: "AES-256-GCM",
    },
  };
}

/* =========================
   DECRYPT
========================= */
export async function decryptFile(blob, password, meta) {
  const key = await deriveKey(
    password,
    new Uint8Array(meta.salt)
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(meta.iv) },
    key,
    await blob.arrayBuffer()
  );

  return new Blob([decrypted], { type: meta.mime });
}
