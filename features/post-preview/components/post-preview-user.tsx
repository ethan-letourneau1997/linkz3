import Link from "next/link";
import { Post } from "@/types";
import { getPostPostedBy } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostPreviewUserProps = {
  post: Post;
};

export async function PostPreviewUser({ post }: PostPreviewUserProps) {
  const postedby = await getPostPostedBy(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <div>
      posted by <Link href={`/profile/${postedby.username}`}>{postedby}</Link> -{" "}
      {timeSincePost}
    </div>
  );
}
