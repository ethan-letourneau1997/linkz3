import { Post, PostPreview as PostPreviewType } from "@/types";

import Link from "next/link";
import { getPostPostedBy } from "@/lib/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PreviewHeaderProps = {
  post: Post | PostPreviewType;
  spaceName: string;
};

export async function PreviewHeader({ post, spaceName }: PreviewHeaderProps) {
  const postedByUsername = await getPostPostedBy(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <div className="text-xs ">
      <Link
        className="text-semibold dark:text-neutral-300 hover:underline"
        href={`/spaces/${post.posted_in}/${spaceName}`}
      >
        {spaceName}
      </Link>
      <span className="dark:text-neutral-400">
        &nbsp;posted by&nbsp;
        <Link className="hover:underline" href={`/profile/${postedByUsername}`}>
          {postedByUsername}
        </Link>
        &nbsp;-&nbsp;{timeSincePost}
      </span>
    </div>
  );
}
