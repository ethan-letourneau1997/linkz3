import { Comment } from "@/types";
import { CommentVoteButtons } from "./comment-vote.buttons";
import { fetchCommentVotes } from "../api/fetch-comment-votes";
import { fetchUserCommentVote } from "../api/fetch-user-comment-vote";

type CommentVotesProps = {
  comment: Comment;
  horizontal?: boolean;
};

export async function CommentVotes({ comment }: CommentVotesProps) {
  const totalCommentVotes = await fetchCommentVotes(comment.id);
  const userVote = await fetchUserCommentVote(comment.id);

  return (
    <CommentVoteButtons
      comment={comment}
      commentVotes={totalCommentVotes || 0}
      userVote={userVote || 0}
    />
  );
}
