"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchSpaceFromId(spaceId: string) {
  const supabase = createServerActionClient({ cookies });

  const { data: community } = await supabase
        .from("community")
        .select()
        .eq("id", spaceId)
        .single();

  return community;
}
