"use client";

import { Comment, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { MobileReplyInput } from "./mobile-reply-input";
import { TextEditor } from "@/features/text-editor";
import { submitComment } from "../api/submit-comment";

type CommentFooterProps = {
  comment: Comment;
  params: PostRouterParams;
  children: JSX.Element;
  options: JSX.Element;
};

export function CommentFooter({
  comment,
  params,
  children,
  options,
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
    <div className="flex items-center gap-2">
      <Button onClick={() => setShowReply(!showReply)} variant="ghost">
        Cancel
      </Button>
      <LoadingButton
        size="sm"
        variant="outline"
        onClick={handleSubmitReply}
        isLoading={isPending}
      >
        Reply
      </LoadingButton>
    </div>
  );

  return (
    <div className="w-full mt-2">
      <MobileReplyInput />
      <div className="flex gap-1">
        {children}
        <Button
          className="text-neutral-400 hover:text-neutral-400"
          variant="ghost"
          size="sm"
          onClick={() => setShowReply(!showReply)}
        >
          {showReply ? "Cancel" : "Reply"}
        </Button>
        <div>{options}</div>
      </div>
      {showReply && (
        <div className="pr-5 mt-3">
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
