'use client';

import { useEffect } from 'react';
import { saveToken } from '@/lib/auth';

export default function GoogleLoginButton({ onSuccess }) {
  console.log("ENV CLIENT:", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    function init() {
      if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handle,
      ux_mode: "popup",
      login_uri: `${BASE_URL}/login`,
      auto_select: false,
    });


      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        {
          theme: 'filled_black',
          size: 'large',
        }
      );
    }

    function poll() {
      if (window.google) {
        init();
        return;
      }

      const timer = setInterval(() => {
        if (window.google) {
          clearInterval(timer);
          init();
        }
      }, 100);
    }

    poll();
  }, []);

  function handle(response) {
    const token = response.credential;
    if (!token) return;

    saveToken(token);
    if (onSuccess) onSuccess(token);
  }

  return <div id="google-btn"></div>;
}
