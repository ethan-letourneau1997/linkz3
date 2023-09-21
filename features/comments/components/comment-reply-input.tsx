"use client";

import { Comment, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { TextEditor } from "@/features/text-editor";
import { createComment } from "../api/create-comment";

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
      await createComment({
        routerParams: params,
        root_post: params.postId,
        parent_comment: comment.id,
        content: commentContent,
      });
      setShowReply(false);
    });
  }

  const replyButton = (
    <div className="flex items-center gap-2   border-l-[1px] border-neutral-600">
      <Button variant="outline">Cancel</Button>
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
    <div className="">
      <button onClick={() => setShowReply(!showReply)}>
        {showReply ? "Cancel" : "Reply"}
      </button>

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
