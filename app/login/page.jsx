'use client';

export default function LoginPage() {
  function login() {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = "http://localhost:3000/oauth/callback";

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
    <div style={{ padding: 30 }}>
      <h1>Login</h1>
      <button onClick={login}>Login with Google</button>
    </div>
  );
}
