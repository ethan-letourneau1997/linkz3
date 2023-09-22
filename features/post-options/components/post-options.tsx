"use client";

import { Post } from "@/types";
import { PostOptionsDropdown } from "./post-options-dropdown";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

type PostOptionsMenuProps = {
  post: Post;
  disableRedirect?: boolean;
};

export function PostOptions({ post, disableRedirect }: PostOptionsMenuProps) {
  const supabase = createClientComponentClient();

  const { data: user } = useSWR("user", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  });

  if (user && user.id === post.created_by)
    return (
      <PostOptionsDropdown post={post} disableRedirect={disableRedirect} />
    );
}
