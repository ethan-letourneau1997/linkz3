"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchProfileById(userId: string | null) {

  if (!userId) return;


  const supabase = createServerActionClient({ cookies });

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", userId)
    .single();

  return public_profile;
}
