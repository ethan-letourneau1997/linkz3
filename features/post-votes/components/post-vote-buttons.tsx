"use client";

import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { Post, PostPreview } from "@/types";
import { experimental_useOptimistic as useOptimistic, useState } from "react";

import { upsertPostVote } from "../api/upsert-post-vote";

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
  // const [optomisticUserVote, setOptomisticUserVote] = useState(userVote);
  // const [optomisticPostVotes, setOptomisticPostVotes] = useState(postVotes);

  const [optimisticUserVote, setOptimisticUserVote] = useOptimistic<number>(
    userVote
  );

  const [optimisticTotalVotes, setOptimisticTotalVotes] = useOptimistic<number>(
    postVotes 
  );

  const [isUpvoted, setIsUpvoted] = useState( optimisticUserVote === 1)
  const [isDownvoted, setIsDownvoted] = useState(optimisticUserVote === -1)

 

  async function updateVotes(userVoteChange: number, totalVotesChange: number) {
    setOptimisticUserVote(userVoteChange);
    setOptimisticTotalVotes(optimisticTotalVotes + totalVotesChange);
    upsertPostVote(post, userVoteChange);
  }

  async function removeUpvote() {
    setIsUpvoted(false)
    await updateVotes(0, -1);
  }

  async function removeDownvote() {
    setIsDownvoted(false)
    await updateVotes(0, 1);
  }

  async function addDownvote() {
    if(optimisticUserVote === 1){
      setIsUpvoted(false)
    }
    setIsDownvoted(true)
    const totalVoteChange = isUpvoted ? -2 : -1;
    await updateVotes(-1, totalVoteChange);
  }

  async function addUpvote() {
    if(optimisticUserVote === -1){
      setIsDownvoted(false)
    }
    setIsUpvoted(true)
    const totalVoteChange = isDownvoted ? 2 : 1;
    await updateVotes(1, totalVoteChange);
  }



  return (
    <div
      className={`flex ${
        horizontal ? "" : "flex-col"
      } items-center place-content-evenly text-neutral-400`}
    >
      {isUpvoted ? (
        <button type="button" className="px-1 py-1 md:px-2">
          <BiSolidUpvote onClick={removeUpvote} className="text-indigo-400" />
        </button>
      ) : (
        <button
          type="button"
          onClick={addUpvote}
          className="px-1 py-1 md:px-2"
        >
          <BiUpvote className="hover:text-indigo-400" />
        </button>
      )}
      <>
        {optimisticTotalVotes < 0 ? (
          <div className="mr-1.5 text-xs md:text-sm ">
            {optimisticTotalVotes}
          </div>
        ) : (
          <div className="text-sm ">{optimisticTotalVotes}</div>
        )}
      </>
      {isDownvoted ? (
        <button type="button" className="px-1 py-1 md:px-2">
          <BiSolidDownvote
            onClick={removeDownvote}
            className="text-indigo-400"
          />
        </button>
      ) : (
        <button onClick={addDownvote} className="px-1 py-1 md:px-2">
          <BiDownvote className="hover:text-indigo-400" />
        </button>
      )}
    </div>
  );
}
