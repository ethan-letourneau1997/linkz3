"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPostVotes(postId: number | null) {

  if(!postId) return 


  const supabase = createServerActionClient({ cookies });

  const { data: comment_votes } = await supabase
    .from("post_vote")
    .select()
    .eq("post_id", postId);

  if (!comment_votes) return 0;
  const voteArray = comment_votes?.map((vote) => vote.vote);
  const totalVotes = voteArray?.reduce((a, b) => a! + b!, 0);

  if (totalVotes) return totalVotes;

  return 0;
}
