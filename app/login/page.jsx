'use client';

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

  function login() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${BASE_URL}/oauth/callback`;

    const url =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      `?client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=id_token` +
      `&scope=openid email profile` +
      `&nonce=xyz123`;

    window.location.href = url;
  }

  return (
    <div className="flex flex-col items-center gap-6 bg-[#050505] p-10 rounded-xl shadow-xl">
      <h1 className="text-3xl font-semibold mb-4">Sign in to E2EE Drive</h1>

      <button
        onClick={login}
        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>
    </div>
  );
}
