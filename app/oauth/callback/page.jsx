'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);

    const idToken = params.get("id_token");

    if (idToken) {
      saveToken(idToken);
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, []);

  return <p>Finishing login...</p>;
}
