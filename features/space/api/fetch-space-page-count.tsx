"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function fetchSpacePageCount(spaceId: string) {
  const supabase = createServerComponentClient({ cookies });

  const { count } = await supabase
    .from("post")
    .select("*", { count: "exact", head: true })
    .eq("posted_in", spaceId);
  if (count) {
    const pages = Math.ceil(count / 10);
    return pages;
  }
}
