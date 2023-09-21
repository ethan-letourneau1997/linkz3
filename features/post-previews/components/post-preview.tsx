import { Post, PostPreview as PostPreviewType } from "@/types";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { PostOptions } from "@/features/post-options/components/post-options";
import { PostVotes } from "@/features/post-votes";
import { PreviewCommentCount } from "./preview-comment-count";
import { PreviewHeader } from "./preview-header";
import { PreviewThumbnail } from "./preview-thumbnail";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getPostCommunityName } from "@/lib/post-helpers";

type PostPreviewProps = {
  post: Post | PostPreviewType;
};

export async function PostPreview({ post }: PostPreviewProps) {
  const spaceName = await getPostCommunityName(post.posted_in);

  return (
    <Card className="grid grid-cols-12 gap-3 px-3 py-3 border-0 border-t rounded-none dark:bg-dark-900 md:rounded-sm md:border sm:px-4">
      <div className="order-2 sm:order-1 col-span-3 sm:col-span-2 aspect-[4/3]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="flex flex-col justify-between order-1 col-span-9 sm:order-2">
        <div>
          <PreviewHeader spaceName={spaceName} post={post} />
          <Link
            className="mt-1 text-sm font-medium sm:text-base text-neutral-200"
            href={`/spaces/${post.posted_in}/${spaceName}/post/${post.id}`}
          >
            {post.title}
          </Link>
        </div>
        <div className="items-center hidden mt-2 text-sm sm:flex text-neutral-400 ">
          <Link
            href={`/spaces/${post.posted_in}/${spaceName}/post/${post.id}`}
            className="flex items-center gap-2 rounded-sm hover:dark:text-neutral-300"
          >
            <PreviewCommentCount post={post} />
          </Link>
          <div className="flex items-center pt-0.5 ml-2 ">
            <PostOptions post={post} disableRedirect />
          </div>
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
          <PreviewCommentCount post={post} />
        </div>
        <PostOptions post={post} disableRedirect />
      </div>
    </Card>
  );
}
