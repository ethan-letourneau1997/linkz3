import { Post, PostPreview as PostPreviewType } from "@/types";

import Link from "next/link";
import { fetchProfileById } from "@/lib/profile/fetch-profile-by-id";
import { getTimeSinceNow } from "@/lib/utils/get-time-since-now";

type PreviewHeaderProps = {
  post: Post | PostPreviewType;
  spaceName: string;
};

export async function PreviewHeader({ post, spaceName }: PreviewHeaderProps) {
  const profile = await fetchProfileById(post.created_by);
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
        <Link className="hover:underline" href={`/profile/${profile.username}`}>
          {profile.username}
        </Link>
        &nbsp;-&nbsp;{timeSincePost}
      </span>
    </div>
  );
}
