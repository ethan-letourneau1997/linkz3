"use client";

import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";

import { Comment } from "@/types";
import { upsertCommentVote } from "../api/upsert-comment-vote";
import { experimental_useOptimistic as useOptimistic } from "react";

type CommentVoteButtonsProps = {
  userVote: number;
  commentVotes: number;
  comment: Comment;
};

export function CommentVoteButtons({
  userVote,
  commentVotes,
  comment,
}: CommentVoteButtonsProps) {
  const [optomisticUserVote, setOptomisticUserVote] = useOptimistic(userVote);
  const [optomisticCommentVotes, setOptomisticCommentVotes] =
    useOptimistic(commentVotes);

  function handleUpvote() {
    if (optomisticUserVote === 0) {
      setOptomisticCommentVotes(optomisticCommentVotes + 1);
    } else if (optomisticUserVote === -1) {
      setOptomisticCommentVotes(optomisticCommentVotes + 2);
    }
    setOptomisticUserVote(1);
    upsertCommentVote(comment, 1);
  }

  function handleDownvote() {
    if (optomisticUserVote === 0) {
      setOptomisticCommentVotes(optomisticCommentVotes - 1);
    } else if (optomisticUserVote === 1) {
      setOptomisticCommentVotes(optomisticCommentVotes - 2);
    }
    setOptomisticUserVote(-1);
    upsertCommentVote(comment, -1);
  }

  async function handleRemoveVote() {
    upsertCommentVote(comment, 0);
    if (optomisticUserVote === 1) {
      setOptomisticCommentVotes(optomisticCommentVotes - 1);
    }
    if (optomisticUserVote === -1) {
      setOptomisticCommentVotes(optomisticCommentVotes + 1);
    }
    setOptomisticUserVote(0);
  }

  return (
    <div className="flex w-fit">
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
        {optomisticCommentVotes < 0 ? (
          <div className="mr-1.5">{optomisticCommentVotes}</div>
        ) : (
          <div>{optomisticCommentVotes}</div>
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
