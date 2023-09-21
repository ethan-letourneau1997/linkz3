"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchSpaceSubscriberCount(spaceId: number) {
  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from("user_community")
      .select("*", { count: "exact", head: true })
      .eq("community_id", spaceId);

    return count;
  } catch (e) {
    console.log(e);
  }
}
