"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchCommentVotes(commentId: number) {
  const supabase = createServerActionClient({ cookies });

  const { data: comment_votes } = await supabase
    .from("comment_vote")
    .select()
    .eq("comment_id", commentId);

  if (!comment_votes) return 0;
  const voteArray = comment_votes?.map((vote) => vote.vote);
  const totalVotes = voteArray?.reduce((a, b) => a! + b!, 0);

  if (totalVotes) return totalVotes;

  return 0;
}
