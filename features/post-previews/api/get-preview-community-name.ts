"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getPreviewCommunityName(communityId: number) {
  const supabase = createServerActionClient({ cookies });

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("id", communityId)
    .single();
  if (community) return community.name;
}
