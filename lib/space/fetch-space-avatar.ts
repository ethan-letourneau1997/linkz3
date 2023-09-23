"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchSpaceAvatar(spaceId: string | number | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: community_avatar } = await supabase
        .from("community_avatar")
        .select()
        .eq("id", spaceId)
        .single();

  return community_avatar;
}
