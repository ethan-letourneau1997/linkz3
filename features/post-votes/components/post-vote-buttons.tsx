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
      setOptomisticPostVotes(optomisticPostVotes + 1);
    } else if (optomisticUserVote === -1) {
      setOptomisticPostVotes(optomisticPostVotes + 2);
    }
    setOptomisticUserVote(1);
    upsertPostVote(post, 1);
  }

  function handleDownvote() {
    if (optomisticUserVote === 0) {
      setOptomisticPostVotes(optomisticPostVotes - 1);
    } else if (optomisticUserVote === 1) {
      setOptomisticPostVotes(optomisticPostVotes - 2);
    }
    setOptomisticUserVote(-1);
    upsertPostVote(post, -1);
  }

  async function handleRemoveVote() {
    upsertPostVote(post, 0);
    if (optomisticUserVote === 1) {
      setOptomisticPostVotes(optomisticPostVotes - 1);
    }
    if (optomisticUserVote === -1) {
      setOptomisticPostVotes(optomisticPostVotes + 1);
    }
    setOptomisticUserVote(0);
  }

  return (
    <div className="flex flex-col items-center place-content-evenly">
      {optomisticUserVote === 1 ? (
        <button className="px-2 py-1 ">
          <BiSolidUpvote onClick={handleRemoveVote} className="text-teal-300" />
        </button>
      ) : (
        <button onClick={handleUpvote} className="px-2 py-1 ">
          <BiUpvote className="hover:text-teal-300" />
        </button>
      )}
      <>
        {optomisticPostVotes < 0 ? (
          <div className="mr-1.5">{optomisticPostVotes}</div>
        ) : (
          <div>{optomisticPostVotes}</div>
        )}
      </>
      {optomisticUserVote === -1 ? (
        <button className="px-2 py-1 ">
          <BiSolidDownvote
            onClick={handleRemoveVote}
            className="text-teal-300"
          />
        </button>
      ) : (
        <button onClick={handleDownvote} className="px-2 py-1 ">
          <BiDownvote className="hover:text-teal-300" />
        </button>
      )}
    </div>
  );
}
