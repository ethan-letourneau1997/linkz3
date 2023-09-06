import { Post } from "@/types";
import { getPostPostedBy } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostMetadataProps = {
  post: Post;
};

export async function PostMetadata({ post }: PostMetadataProps) {
  const postedby = await getPostPostedBy(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <div>
      posted by {postedby} - {timeSincePost}
    </div>
  );
}
