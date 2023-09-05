import { PostRouterParams } from "@/types";
import { Comment } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";
import { CommentVotes } from "@/features/comment-votes";
import { CommentReplyInput } from "./comment-reply-input";

type CommentProps = {
  comment: Comment;
  children: React.ReactNode;
  params: PostRouterParams;
};

export function Comment({ comment, children, params }: CommentProps) {
  return (
    <div className="p-2 mt-3 border">
      <div>
        <CommentUser comment={comment} />
        <div
          className="prose text-neutral-200"
          dangerouslySetInnerHTML={{ __html: comment.content || "" }}
        />
      </div>
      <div>
        <CommentVotes horizontal comment={comment} />
      </div>
      <div>
        <CommentReplyInput comment={comment} params={params} />
      </div>
      {children}
    </div>
  );
}

type CommentUserProps = {
  comment: Comment;
};
export async function CommentUser({ comment }: CommentUserProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", comment.posted_by)
    .single();

  return (
    <div className="text-sm text-neutral-400">
      {public_profile.username} - {getTimeSinceNow(comment.created_at, true)}
    </div>
  );
}
