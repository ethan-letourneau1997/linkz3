import { Comment } from "@/types";
import { CommentPreviewParent } from "./comment-preview-parent";
import { CommentPreviewPost } from "./comment-preview-post";
import { ProfileComment } from "./profile-comment";

type CommentPreviewProps = {
  comment: Comment;
  username: string;
};

export async function CommentPreview({
  comment,
  username,
}: CommentPreviewProps) {
  return (
    <div className="px-4 py-3 text-sm border dark:border-neutral-600 dark:bg-neutral-900">
      <CommentPreviewPost comment={comment} />
      {comment.parent_comment ? (
        <CommentPreviewParent comment={comment}>
          <ProfileComment username={username} comment={comment} />
        </CommentPreviewParent>
      ) : (
        <>
          <ProfileComment username={username} comment={comment} />
        </>
      )}
    </div>
  );
}
