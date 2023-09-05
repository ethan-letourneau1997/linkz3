"use client";

import { PostRouterParams } from "@/types";
import { RootCommentInput } from "@/features/layout/post-layout/components/root-comment-input";
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
    <div>
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
