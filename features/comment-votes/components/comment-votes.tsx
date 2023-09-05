import { Comment } from "@/types";
import { CommentVoteButtons } from "./comment-vote.buttons";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTotalVotes } from "@/lib/get-total-votes";

type CommentVotesProps = {
  comment: Comment;
  horizontal?: boolean;
};

export async function CommentVotes({ comment }: CommentVotesProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: comment_votes } = await supabase
    .from("comment_vote")
    .select()
    .eq("comment_id", comment.id);

  const totalVotes = getTotalVotes(comment_votes);

  const { data } = await supabase.auth.getSession();

  const { data: user_vote } = await supabase
    .from("comment_vote")
    .select()
    .match({ user_id: data.session?.user.id, comment_id: comment.id })
    .single();

  return (
    <CommentVoteButtons
      comment={comment}
      commentVotes={totalVotes || 0}
      userVote={user_vote?.vote || 0}
    />
  );
}
