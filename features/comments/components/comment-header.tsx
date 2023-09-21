import { Comment } from "@/types";
import { CommentAvatar } from "./comment-avatar";
import { fetchProfileFromId } from "@/lib/profile/fetch-profile-from-id";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";

type CommentHeaderProps = {
  comment: Comment;
};
export async function CommentHeader({ comment }: CommentHeaderProps) {
  const profile = await fetchProfileFromId(comment.posted_by);

  return (
    <>
      <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400">
        <CommentAvatar user={profile} />
        <span>
          {profile.username} - {getTimeSinceNow(comment.created_at, true)}
        </span>
      </div>
    </>
  );
}
