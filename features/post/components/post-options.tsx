import { Post, PostRouterParams } from "@/types";

import { PostDeleteButton } from "./post-delete-button";
import { PostEditButton } from "./post-edit-button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type PostOptionsProps = {
  post: Post;
  params: PostRouterParams;
};

export async function PostOptions({ post, params }: PostOptionsProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session?.user.id && data.session?.user.id === post.created_by)
    return (
      <div className="flex items-center gap-2">
        <PostDeleteButton post={post} params={params} />
        <PostEditButton post={post} />
      </div>
    );
}
