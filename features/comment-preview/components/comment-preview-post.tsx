import { Comment } from "@/types";
import { fetchPostFromId } from "@/lib/post/fetch-post-from-id";
import { fetchProfileById } from "@/lib/profile/fetch-profile-by-id";
import { fetchSpaceById } from "@/lib/space/fetch-space-by-id";

type CommentPreviewPostProps = {
  comment: Comment;
};

export async function CommentPreviewPost({ comment }: CommentPreviewPostProps) {
  const post = await fetchPostFromId(comment.root_post);
  const profile = post ? await fetchProfileById(post.created_by) : null;
  const space = post ? await fetchSpaceById(post.posted_in) : null;

  return (
    <div className="pb-2 text-sm border-b-2 border-neutral-700">
      {post.title} - {space?.name} posted by {profile?.username}
    </div>
  );
}
