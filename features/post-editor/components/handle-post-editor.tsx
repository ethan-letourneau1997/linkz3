"use client";

import { Post, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { Button } from "flowbite-react";
import { TextEditor } from "@/features/text-editor";
import { updatePost } from "../api/update-post";

type HandlePostEditorProps = {
  post: Post;
  params: PostRouterParams;
};

export function HandlePostEditor({ post, params }: HandlePostEditorProps) {
  const [postContent, setPostContent] = useState(post.content || "");

  const [isPending, startTransition] = useTransition();

  function handleUpdatePost() {
    startTransition(async () => {
      updatePost(post, params.spaceName, postContent);
    });
  }

  const updatePostButton = (
    <div className="flex gap-2 mb-2">
      <button className="px-3 hover:text-red-500">Cancel</button>
      <Button
        color="success"
        onClick={handleUpdatePost}
        isProcessing={isPending}
      >
        Save
      </Button>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mt-5">
      <TextEditor
        editorContent={postContent}
        setEditorContent={setPostContent}
        replyButton={updatePostButton}
      />
    </div>
  );
}
