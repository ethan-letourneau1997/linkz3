"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

// type NewPost = {
//   title: string;
//   community_name: string;
//   content?: string;
//   type: string;
// };

export async function createPost(
  community_name: string,
  type: string,
  title: string,
  content?: string
) {
  const supabase = createServerActionClient({ cookies });

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("name", community_name)
    .single();

  const { data } = await supabase
    .from("post")
    .insert({
      title: title,
      content: content,
      posted_in: community.id,
      type,
    })
    .select()
    .single();

  if (data) {
    revalidatePath(`/spaces/${community_name}`);
    // redirect(
    //   `/community/${community_name}/post/${data.id}/${slugify(data.title)}`
    // );
    return data.id;
  }
}
