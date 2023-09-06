import { Comment } from "@/types";
import { CommentPreviewParent } from "./comment-preview-parent";
import { CommentPreviewPost } from "./comment-preview-post";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type CommentPreviewProps = {
  comment: Comment;
  username: string;
};

export async function CommentPreview({
  comment,
  username,
}: CommentPreviewProps) {
  return (
    <div className="px-4 py-3 text-sm border dark:border-neutral-600 bg-neutral-900">
      <CommentPreviewPost comment={comment} />
      {comment.parent_comment && <CommentPreviewParent comment={comment} />}

      <div
        className={`${
          comment.parent_comment ? "ml-5" : ""
        } bg-neutral-700 px-3 py-2 mt-3`}
      >
        <div>
          {username} - {getTimeSinceNow(comment.created_at, true)}
        </div>
        <div
          className="w-full text-sm prose dark:text-neutral-200 "
          dangerouslySetInnerHTML={{ __html: comment.content || "" }}
        />
      </div>
    </div>
  );
}
