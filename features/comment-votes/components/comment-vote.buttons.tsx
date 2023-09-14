"use client";

import {
  PiArrowFatDownFill,
  PiArrowFatDownLight,
  PiArrowFatUpFill,
  PiArrowFatUpLight,
} from "react-icons/pi";

import { Comment } from "@/types";
import { upsertCommentVote } from "../api/upsert-comment-vote";
import { useState } from "react";

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
  const [optomisticUserVote, setOptomisticUserVote] = useState(userVote);
  const [optomisticCommentVotes, setOptomisticCommentVotes] =
    useState(commentVotes);

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
    <div className="flex items-center w-fit gap-1.5">
      {optomisticUserVote === 1 ? (
        <button className="py-1 ">
          <PiArrowFatUpFill
            size={20}
            onClick={handleRemoveVote}
            className="text-teal-300"
          />
        </button>
      ) : (
        <button onClick={handleUpvote} className="py-1 ">
          <PiArrowFatUpLight size={20} className="hover:text-teal-300" />
        </button>
      )}
      <>
        {optomisticCommentVotes < 0 ? (
          <div className="mr-.5 text-xs">{optomisticCommentVotes}</div>
        ) : (
          <div className="text-xs">{optomisticCommentVotes}</div>
        )}
      </>
      {optomisticUserVote === -1 ? (
        <button className="py-1 ">
          <PiArrowFatDownFill
            size={20}
            onClick={handleRemoveVote}
            className="text-teal-300"
          />
        </button>
      ) : (
        <button onClick={handleDownvote} className="py-1 ">
          <PiArrowFatDownLight size={20} className="hover:text-teal-300" />
        </button>
      )}
    </div>
  );
}
