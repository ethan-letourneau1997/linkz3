"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchLoggedInProfile() {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", data.session?.user.id)
    .single();

  return public_profile;
}
