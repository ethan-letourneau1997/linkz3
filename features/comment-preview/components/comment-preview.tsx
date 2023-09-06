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
  const profileComment = (
    <div className="pl-5 mt-3 border-l border-dashed dark:border-neutral-400">
      <div className="px-3 py-2 rounded dark:bg-neutral-800">
        <div className="text-xs">
          {username} -{" "}
          <span className="text-neutral-400">
            {getTimeSinceNow(comment.created_at, true)}
          </span>
        </div>
        <div
          className="w-full text-sm prose dark:text-neutral-200 "
          dangerouslySetInnerHTML={{ __html: comment.content || "" }}
        />
      </div>
    </div>
  );
  return (
    <div className="px-4 py-3 text-sm border dark:border-neutral-600 dark:bg-neutral-900">
      <CommentPreviewPost comment={comment} />
      {/* {comment.parent_comment && <CommentPreviewParent comment={comment} />} */}
      {comment.parent_comment ? (
        <CommentPreviewParent comment={comment}>
          {profileComment}
        </CommentPreviewParent>
      ) : (
        <>{profileComment}</>
      )}
    </div>
  );
}
