import { Post } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function getPostPostedBy(createdBy: Post["created_by"]) {
  "use server";

  const supabase = createServerActionClient({ cookies });

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", createdBy)
    .single();

  if (public_profile?.username) return public_profile.username;
}

export async function getPostCommunityName(postedIn: Post["posted_in"]) {
  "use server";

  const supabase = createServerActionClient({ cookies });

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("id", postedIn)
    .single();

  if (community) return community.name;
}

export async function getPostCommentCount(postId: Post["id"]) {
  "use server";

  const supabase = createServerActionClient({ cookies });

  const { count } = await supabase
    .from("comment")
    .select("*", { count: "exact", head: true })
    .eq("root_post", postId);

  return count;
}
