"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getProfileCommentPageCount(username: string) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user } = await supabase
    .from("public_profile")
    .select()
    .eq("username", username)
    .single();

  const { count } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("posted_by", user.id);
  if (count) {
    const pages = Math.ceil(count / 10);
    return pages;
  }
}
