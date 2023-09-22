import { Comment } from "@/types";
import { fetchCommentFromId } from "@/lib/comment/fetch-comment-from-id";
import { fetchProfileById } from "@/lib/profile/fetch-profile-by-id";
import { getTimeSinceNow } from "@/lib/utils/get-time-since-now";

type CommentPreviewParentProps = {
  comment: Comment;
  children: JSX.Element;
};

export async function CommentPreviewParent({
  comment,
  children,
}: CommentPreviewParentProps) {
  const parentComment = await fetchCommentFromId(comment.parent_comment!);
  const profile = await fetchProfileById(comment.posted_by);

  return (
    <div className="pl-5 mt-3 text-sm border-l border-dashed dark:border-neutral-400">
      <div className="px-3 py-2 dark:bg-neutral-900">
        <div className="text-xs">
          {profile.username} - {getTimeSinceNow(comment.created_at, true)}
        </div>
        <div
          className="w-full text-sm prose dark:prose-invert line-clamp-1"
          dangerouslySetInnerHTML={{ __html: parentComment.content || "" }}
        />
      </div>
      {children}
    </div>
  );
}
