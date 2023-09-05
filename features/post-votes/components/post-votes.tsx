import { Post } from "@/types";
import { PostVoteButtons } from "./post-vote-buttons";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTotalVotes } from "@/lib/get-total-votes";

type PostVotesProps = {
  post: Post;
  horizontal?: boolean;
};

export async function PostVotes({ post, horizontal }: PostVotesProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post_votes } = await supabase
    .from("post_vote")
    .select()
    .eq("post_id", post.id);

  const totalVotes = getTotalVotes(post_votes);

  const { data } = await supabase.auth.getSession();

  const { data: user_vote } = await supabase
    .from("post_vote")
    .select()
    .match({ user_id: data.session?.user.id, post_id: post.id })
    .single();

  return (
    <PostVoteButtons
      post={post}
      postVotes={totalVotes || 0}
      userVote={user_vote?.vote || 0}
      horizontal={horizontal}
    />
  );
}
