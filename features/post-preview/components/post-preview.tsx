import { Post, PostPreview as PostPreviewType } from "@/types";
import { getPostCommunityName, getPostPostedBy } from "@/helpers/post-helpers";

import { Card } from "@/components/ui/card";
import { GoComment } from "react-icons/go";
import Link from "next/link";
import { PostVotes } from "@/features/post-votes";
import { PreviewThumbnail } from "./preview-thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getPostCommentCount } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostPreviewProps = {
  post: Post | PostPreviewType;
};

export async function PostPreview({ post }: PostPreviewProps) {
  const timeSincePost = getTimeSinceNow(post.created_at, true);
  const spaceName = await getPostCommunityName(post.posted_in);
  const commentCount = await getPostCommentCount(post.id!);
  const postedByUsername = await getPostPostedBy(post.created_by);

  const linkToPost = `/spaces/${post.posted_in}/${spaceName}/post/${post.id}`;
  const linkToSpace = `/spaces/${post.posted_in}/${spaceName}`;
  const profileLink = `/profile/${postedByUsername}`;

  return (
    <Card className="grid grid-cols-12 gap-3 px-3 py-3 border-0 border-t rounded-none dark:bg-dark-900 md:rounded-md md:border sm:mt-3 sm:px-4">
      <div className="order-2 sm:order-1 col-span-3 sm:col-span-2 aspect-[4/3]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="flex flex-col justify-between order-1 col-span-9 sm:order-2">
        <div>
          <div className="text-xs ">
            <Link
              className="text-semibold dark:text-neutral-300 hover:underline"
              href={linkToSpace}
            >
              {spaceName}
            </Link>
            <span className="dark:text-neutral-400">
              &nbsp;posted by&nbsp;
              <Link className="hover:underline" href={profileLink}>
                {postedByUsername}
              </Link>
              &nbsp;-&nbsp;{timeSincePost}
            </span>
          </div>
          <Link
            className="mt-1 text-sm font-medium sm:text-base text-neutral-200"
            href={linkToPost}
          >
            {post.title}
          </Link>
        </div>
        <div className="items-center hidden mt-2 text-sm sm:flex text-neutral-400 ">
          <Link
            href={linkToPost}
            className="flex items-center gap-2 rounded-sm hover:dark:text-neutral-300"
          >
            <GoComment />
            {commentCount} comments
          </Link>
        </div>
      </div>
      <div className="order-3 hidden col-span-1 sm:block ">
        <div className="flex justify-end h-full ">
          <PostVotes post={post} />
        </div>
      </div>
      <div className="flex items-center order-4 col-span-12 gap-2 mt-2 text-sm sm:hidden text-neutral-400 ">
        <div className="w-fit sm:hidden">
          <PostVotes post={post} horizontal />
        </div>
        <div className="flex items-center gap-2 ">
          <GoComment />
          {commentCount} comments
        </div>
      </div>
    </Card>
  );
}
