"use client";

import { Comment, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { LoadingButton } from "@/components/loading-button";
import { TextEditor } from "@/features/text-editor";
import { submitComment } from "../api/submit-comment";

type CommentReplyInputProps = {
  comment: Comment;
  params: PostRouterParams;
};

export function CommentReplyInput({ comment, params }: CommentReplyInputProps) {
  const [commentContent, setCommentContent] = useState("");
  const [showReply, setShowReply] = useState(false);

  const [isPending, startTransition] = useTransition();

  async function handleSubmitReply() {
    startTransition(async () => {
      await submitComment({
        routerParams: params,
        root_post: params.postId,
        parent_comment: comment.id,
        content: commentContent,
      });
      setShowReply(false);
    });
  }

  const replyButton = (
    <LoadingButton size="sm" onClick={handleSubmitReply} isLoading={isPending}>
      Reply
    </LoadingButton>
  );

  return (
    <div className="">
      <button onClick={() => setShowReply(!showReply)}>reply</button>

      {showReply && (
        <>
          <TextEditor
            editorContent={commentContent}
            setEditorContent={setCommentContent}
            replyButton={replyButton}
          />
        </>
      )}
    </div>
  );
}
