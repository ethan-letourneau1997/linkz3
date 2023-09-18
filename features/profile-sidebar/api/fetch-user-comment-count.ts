"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchUserCommentCount(userId: string) {

  const supabase = createServerActionClient({ cookies });

  try {
    const { count } = await supabase
      .from("comment")
      .select("*", { count: "exact", head: true })
      .eq("posted_by", userId);

    return count;
  } catch (e) {
    console.log(e);
  }
}

