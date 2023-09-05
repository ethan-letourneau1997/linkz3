"use client";

import { useState, useTransition } from "react";

import { Button } from "flowbite-react";
import { PostRouterParams } from "@/types";
import { TextEditor } from "@/features/text-editor";
import { submitComment } from "@/features/comments/api/submit-comment";

type RootCommentInputProps = {
  params: PostRouterParams;
  children?: JSX.Element;
  hideReply: () => void;
};

export function RootCommentInput({ params, hideReply }: RootCommentInputProps) {
  const [commentContent, setCommentContent] = useState("");

  const [isPending, startTransition] = useTransition();

  async function handleSubmitReply() {
    startTransition(async () => {
      await submitComment({
        routerParams: params,
        root_post: params.postId,
        content: commentContent,
      });
      hideReply();
    });
  }

  const replyButton = (
    <Button size="sm" onClick={handleSubmitReply} isProcessing={isPending}>
      Reply
    </Button>
  );

  return (
    <TextEditor
      editorContent={commentContent}
      setEditorContent={setCommentContent}
      replyButton={replyButton}
    />
  );
}
