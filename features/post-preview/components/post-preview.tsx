import Link from "next/link";
import { Post } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { Suspense } from "react";
import { VotePlaceholer } from "@/features/post-votes/components/vote-placeholder";

import { PostPreviewPostedIn } from "./post-preview-posted-in";
import { PostPreviewPostedBy } from "./post-preview-posted-by";
import { PostPreviewCommentCount } from "./get-preview-comment-count";
import { Skeleton } from "@/components/ui/skeleton";

import { PostPreviewThumbnail } from "./post-preview-thumbnail";

type SpacePreviewProps = {
  post: Post;
};

export async function PostPreview({ post }: SpacePreviewProps) {
  return (
    <div className="grid grid-cols-12 gap-3 px-2 py-3 border-neutral-500">
      <div className="col-span-2">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PostPreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="col-span-9">
        <Link
          className=" hover:underline"
          // href={`/spaces/${post.id}/${post.title}`}
          href="#"
        >
          {post.title}
        </Link>

        <Suspense fallback={<Skeleton className="w-1/4 h-[18px] py-[6px]" />}>
          <PostPreviewPostedIn post={post} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-1/3 h-[18px] py-[6px]" />}>
          <PostPreviewPostedBy post={post} />
        </Suspense>
        <Suspense fallback={<Skeleton className="w-1/4 h-[18px] py-[6px]" />}>
          <PostPreviewCommentCount post={post} />
        </Suspense>
      </div>
      <div className="flex justify-end col-span-1 ">
        <Suspense fallback={<VotePlaceholer />}>
          <PostVotes post={post} />
        </Suspense>
      </div>
    </div>
  );
}
