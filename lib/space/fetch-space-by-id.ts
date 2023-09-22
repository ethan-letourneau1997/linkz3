"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchSpaceById(spaceId: string | number | null) {
  const supabase = createServerActionClient({ cookies });

  const { data: community } = await supabase
        .from("community")
        .select()
        .eq("id", spaceId)
        .single();

  return community;
}
