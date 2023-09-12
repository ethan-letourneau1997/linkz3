"use client";

import { Comment, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { LoadingButton } from "@/components/loading-button";
import { TextEditor } from "@/features/text-editor";
import { submitComment } from "../api/submit-comment";

type CommentFooterProps = {
  comment: Comment;
  params: PostRouterParams;
  children: JSX.Element;
};

export function CommentFooter({
  comment,
  params,
  children,
}: CommentFooterProps) {
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
    <LoadingButton
      size="sm"
      variant="outline"
      onClick={handleSubmitReply}
      isLoading={isPending}
    >
      Reply
    </LoadingButton>
  );

  return (
    <div className="w-full ">
      <div className="flex gap-1">
        {children}
        <button onClick={() => setShowReply(!showReply)}>
          {showReply ? "Cancel" : "Reply"}
        </button>
      </div>
      {showReply && (
        <div className="mt-3">
          <TextEditor
            editorContent={commentContent}
            setEditorContent={setCommentContent}
            replyButton={replyButton}
          />
        </div>
      )}
    </div>
  );
}
