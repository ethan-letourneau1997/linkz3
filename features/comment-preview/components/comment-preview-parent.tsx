import { Comment } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type CommentPreviewParentProps = {
  comment: Comment;
};

export async function CommentPreviewParent({
  comment,
}: CommentPreviewParentProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: parent_comment } = await supabase
    .from("comment")
    .select()
    .eq("id", comment.parent_comment)
    .single();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", comment.posted_by)
    .single();

  return (
    <div className="p-4 mt-3 text-sm bg-neutral-800">
      <div>
        {public_profile.username} - {getTimeSinceNow(comment.created_at)}
      </div>
      <div
        className="w-full text-sm prose dark:text-neutral-200 line-clamp-1"
        dangerouslySetInnerHTML={{ __html: parent_comment.content || "" }}
      />
    </div>
  );
}
