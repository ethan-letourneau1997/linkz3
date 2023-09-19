import { Comment } from "@/types";
import { CommentAvatar } from "./comment-avatar";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";

type CommentHeaderProps = {
  comment: Comment;
};
export async function CommentHeader({ comment }: CommentHeaderProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", comment.posted_by)
    .single();

  return (
    <>
      <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400">
        <CommentAvatar user={public_profile} />
        <span>
          {public_profile.username} -{" "}
          {getTimeSinceNow(comment.created_at, true)}
        </span>
      </div>
    </>
  );
}
