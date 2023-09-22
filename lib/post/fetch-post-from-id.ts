"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPostFromId(postId: number | string | null) {

  if(!postId) return 
  
  const supabase = createServerActionClient({ cookies });

  const { data: root_post } = await supabase
    .from("post")
    .select()
    .eq("id", postId)
    .single();


  return root_post;
}
