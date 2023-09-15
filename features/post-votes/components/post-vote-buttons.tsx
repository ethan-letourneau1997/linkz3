"use client";

import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { Post, PostPreview } from "@/types";

import { upsertPostVote } from "../api/upsert-post-vote";
import { useState } from "react";

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
  const [optomisticUserVote, setOptomisticUserVote] = useState(userVote);
  const [optomisticPostVotes, setOptomisticPostVotes] = useState(postVotes);

  async function handleUpvote() {
    if (optomisticUserVote === 0) {
      setOptomisticPostVotes(optomisticPostVotes + 1);
    } else if (optomisticUserVote === -1) {
      setOptomisticPostVotes(optomisticPostVotes + 2);
    }

    await upsertPostVote(post, 1);
  }

  async function handleDownvote() {
    setOptomisticUserVote(-1);
    if (optomisticUserVote === 0) {
      setOptomisticPostVotes(optomisticPostVotes - 1);
    } else if (optomisticUserVote === 1) {
      setOptomisticPostVotes(optomisticPostVotes - 2);
    }

    await upsertPostVote(post, -1);
  }

  async function handleRemoveVote() {
    setOptomisticUserVote(0);
    if (optomisticUserVote === 1) {
      setOptomisticPostVotes(optomisticPostVotes - 1);
    }
    if (optomisticUserVote === -1) {
      setOptomisticPostVotes(optomisticPostVotes + 1);
    }

    await upsertPostVote(post, 0);
  }

  return (
    <div
      className={`flex ${
        horizontal ? "" : "flex-col"
      } items-center place-content-evenly text-neutral-400`}
    >
      {optomisticUserVote === 1 ? (
        <button type="button" className="px-1 py-1 md:px-2">
          <BiSolidUpvote onClick={handleRemoveVote} className="text-teal-300" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleUpvote}
          className="px-1 py-1 md:px-2"
        >
          <BiUpvote className="hover:text-teal-300" />
        </button>
      )}
      <>
        {optomisticPostVotes < 0 ? (
          <div className="mr-1.5 text-xs md:text-sm ">
            {optomisticPostVotes}
          </div>
        ) : (
          <div className="text-sm ">{optomisticPostVotes}</div>
        )}
      </>
      {optomisticUserVote === -1 ? (
        <button type="button" className="px-1 py-1 md:px-2">
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
