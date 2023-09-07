import { Comment } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type CommentPreviewParentProps = {
  comment: Comment;
  children: JSX.Element;
};

export async function CommentPreviewParent({
  comment,
  children,
}: CommentPreviewParentProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: parent_comment } = await supabase
    .from("comment")
    .select()
    .eq("id", comment.parent_comment)
    .single();

  async function getPostedByUsername() {
    if (parent_comment) {
      const { data: public_profile } = await supabase
        .from("public_profile")
        .select()
        .eq("id", comment.posted_by)
        .single();

      return public_profile.username;
    }
  }

  const username = await getPostedByUsername();

  return (
    <div className="pl-5 mt-3 text-sm border-l border-dashed dark:border-neutral-400">
      <div className="px-3 py-2 dark:bg-neutral-900">
        <div className="text-xs">
          {username} - {getTimeSinceNow(comment.created_at, true)}
        </div>
        <div
          className="w-full text-sm prose  dark:prose-invert line-clamp-1"
          dangerouslySetInnerHTML={{ __html: parent_comment.content || "" }}
        />
      </div>
      {children}
    </div>
  );
}
