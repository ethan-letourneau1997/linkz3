"use client";

import { PostRouterParams } from "@/types";
import { RootCommentInput } from "@/layout/post-layout/components/root-comment-input";
import { useState } from "react";

type PostFooterProps = {
  children: React.ReactNode;
  params: PostRouterParams;
};

export function PostFooter({ children, params }: PostFooterProps) {
  const [showReply, setShowReply] = useState(false);

  function handleHideReply() {
    setShowReply(false);
  }
  return (
    <div className="w-full ">
      <div className="flex gap-3">
        {children}
        <button onClick={() => setShowReply(!showReply)}>
          {showReply ? "Cancel" : "Reply"}
        </button>
      </div>
      {showReply && (
        <RootCommentInput params={params} hideReply={handleHideReply} />
      )}
    </div>
  );
}
