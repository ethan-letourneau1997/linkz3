"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchUserPostCount(userId: string) {

  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("created_by", userId);

    return count;
  } catch (e) {
    console.log(e);
  }
}
