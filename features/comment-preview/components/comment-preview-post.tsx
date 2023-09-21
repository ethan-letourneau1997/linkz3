import { Comment } from "@/types";
import { fetchPostFromId } from "@/lib/post/fetch-post-from-id";
import { fetchProfileFromId } from "@/lib/profile/fetch-profile-from-id";
import { fetchSpaceFromId } from "@/lib/space/fetch-space-from-id";

type CommentPreviewPostProps = {
  comment: Comment;
};

export async function CommentPreviewPost({ comment }: CommentPreviewPostProps) {
  const post = await fetchPostFromId(comment.root_post);
  const profile = post ? await fetchProfileFromId(post.created_by) : null;
  const space = post ? await fetchSpaceFromId(post.posted_in) : null;

  return (
    <div className="pb-2 text-sm border-b-2 border-neutral-700">
      {post.title} - {space?.name} posted by {profile?.username}
    </div>
  );
}
