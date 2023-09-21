"use client";

import { Comment } from "@/types";
import { CommentOptionsDropdown } from "./comment-options-dropdown";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

type CommentOptionsMenuProps = {
  comment: Comment;
};

export function CommentOptions({ comment }: CommentOptionsMenuProps) {
  const supabase = createClientComponentClient();

  const { data: user } = useSWR("user", async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user;
  });

  if (user && user.id === comment.posted_by)
    return <CommentOptionsDropdown comment={comment} />;
}
