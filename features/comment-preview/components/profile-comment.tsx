import { Comment } from "@/types";
import { getTimeSinceNow } from "@/lib/utils/get-time-since-now";

type ProfileCommentProps = {
  username: string;
  comment: Comment;
};

export function ProfileComment({ username, comment }: ProfileCommentProps) {
  return (
    <div className="pl-5 mt-3 border-l border-dashed dark:border-neutral-400">
      <div className="px-3 py-2 rounded dark:bg-neutral-800">
        <div className="text-xs">
          {username} -{" "}
          <span className="text-neutral-400">
            {getTimeSinceNow(comment.created_at, true)}
          </span>
        </div>
        <div
          className="w-full text-sm prose dark:prose-invert "
          dangerouslySetInnerHTML={{ __html: comment.content || "" }}
        />
      </div>
    </div>
  );
}
