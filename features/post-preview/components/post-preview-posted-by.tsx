import { Post } from "@/types";
import { getPostPostedBy } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostPreviewPostedByProps = {
  post: Post;
};

export async function PostPreviewPostedBy({ post }: PostPreviewPostedByProps) {
  const postedby = await getPostPostedBy(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <div className="text-xs text-neutral-500">
      posted by {postedby} - {timeSincePost}
    </div>
  );
}
