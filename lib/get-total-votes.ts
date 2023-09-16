import { CommentVote, PostVote } from "@/types";

export function getTotalVotes(itemVotes: PostVote[] | CommentVote[] | null) {
  if (!itemVotes) return 0;
  const voteArray = itemVotes?.map((vote) => vote.vote);
  const totalVotes = voteArray?.reduce((a, b) => a! + b!, 0);

  if(totalVotes) return totalVotes

  return 0

}
