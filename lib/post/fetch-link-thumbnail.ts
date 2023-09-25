import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchLinkThumbnail(postId: number | null) {
  "use server";

  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase
    .from("link_preview")
    .select()
    .eq("id", postId)
    .single();

  return data;
}
