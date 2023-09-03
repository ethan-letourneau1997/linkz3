"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function GoogleLogin() {
  const supabase = createClientComponentClient();
  async function logIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <button className="dark:text-white bg-neutral-600" onClick={logIn}>
      Log in with Google
    </button>
  );
}
