"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function GoogleLogin() {
  const supabase = createClientComponentClient();
  async function logIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(data, error);
  }

  return (
    <button className="dark:text-white bg-neutral-600" onClick={logIn}>
      Log in with Google
    </button>
  );
}
