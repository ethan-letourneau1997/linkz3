import { Post, PostPreview } from "@/types";

import { PostVoteButtons } from "./post-vote-buttons";
import { fetchPostVotes } from "../api/fetch-post-votes";
import { fetchUserPostVote } from "../api/fetch-user-post-vote";

type PostVotesProps = {
  post: Post | PostPreview;
  horizontal?: boolean;
};

export async function PostVotes({ post, horizontal }: PostVotesProps) {
  const totalVotes = await fetchPostVotes(post.id);

  const userVote = await fetchUserPostVote(post.id);

  return (
    <PostVoteButtons
      post={post}
      postVotes={totalVotes}
      userVote={userVote}
      horizontal={horizontal}
    />
  );
}
