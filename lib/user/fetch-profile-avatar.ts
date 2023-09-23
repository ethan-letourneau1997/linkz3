"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchProfileAvatar(userId: string | number | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: community_avatar } = await supabase
        .from("profile_avatar")
        .select()
        .eq("id", userId)
        .single();

  return community_avatar;
}
