"use client";

import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { Post, PostPreview } from "@/types";

import { upsertPostVote } from "../api/upsert-post-vote";
import { experimental_useOptimistic as useOptimistic } from "react";

type PostVoteButtonsProps = {
  userVote: number;
  postVotes: number;
  post: Post | PostPreview;
  horizontal?: boolean;
};

export function PostVoteButtons({
  userVote,
  postVotes,
  post,
  horizontal,
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
    <div
      className={`flex ${
        horizontal ? "" : "flex-col"
      } items-center place-content-evenly`}
    >
      {optomisticUserVote === 1 ? (
        <button className="px-1 py-1 md:px-2">
          <BiSolidUpvote onClick={handleRemoveVote} className="text-teal-300" />
        </button>
      ) : (
        <button onClick={handleUpvote} className="px-1 py-1 md:px-2">
          <BiUpvote className="hover:text-teal-300" />
        </button>
      )}
      <>
        {optomisticPostVotes < 0 ? (
          <div className="mr-1.5 text-sm ">{optomisticPostVotes}</div>
        ) : (
          <div className="text-sm ">{optomisticPostVotes}</div>
        )}
      </>
      {optomisticUserVote === -1 ? (
        <button className="px-1 py-1 md:px-2">
          <BiSolidDownvote
            onClick={handleRemoveVote}
            className="text-teal-300"
          />
        </button>
      ) : (
        <button onClick={handleDownvote} className="px-1 py-1 md:px-2">
          <BiDownvote className="hover:text-teal-300" />
        </button>
      )}
    </div>
  );
}
