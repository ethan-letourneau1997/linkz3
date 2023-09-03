"use client";

import { Post } from "@/types";
import { experimental_useOptimistic as useOptimistic } from "react";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { upsertPostVote } from "../api/upsert-post-vote";

type PostVoteButtonsProps = {
  userVote: number;
  postVotes: number;
  post: Post;
};

export function PostVoteButtons({
  userVote,
  postVotes,
  post,
}: PostVoteButtonsProps) {
  const [optomisticUserVote, setOptomisticUserVote] = useOptimistic(userVote);
  const [optomisticPostVotes, setOptomisticPostVotes] =
    useOptimistic(postVotes);

  function handleUpvote() {
    if (optomisticUserVote === 0) {
      setOptomisticUserVote(1);
      setOptomisticPostVotes(optomisticPostVotes + 1);
    } else if (optomisticUserVote === -1) {
      setOptomisticUserVote(1);
      setOptomisticPostVotes(optomisticPostVotes + 2);
    }
    upsertPostVote(post, 1);
  }

  function handleDownvote() {
    if (optomisticUserVote === 0) {
      setOptomisticUserVote(-1);
      setOptomisticPostVotes(optomisticPostVotes - 1);
    } else if (optomisticUserVote === 1) {
      setOptomisticUserVote(-1);
      setOptomisticPostVotes(optomisticPostVotes - 2);
    }
    upsertPostVote(post, -1);
  }

  return (
    <div className="flex flex-col items-center">
      {optomisticUserVote === 1 ? (
        <div className="px-2 py-1 ">
          <BiSolidUpvote className="text-teal-300" />
        </div>
      ) : (
        <button onClick={handleUpvote} className="px-2 py-1 ">
          <BiUpvote className="hover:text-teal-300" />
        </button>
      )}
      <div>{optomisticPostVotes}</div>
      {optomisticUserVote === -1 ? (
        <div className="px-2 py-1 ">
          <BiSolidDownvote className="text-teal-300" />
        </div>
      ) : (
        <button onClick={handleDownvote} className="px-2 py-1 ">
          <BiDownvote className="hover:text-teal-300" />
        </button>
      )}
    </div>
  );
}
