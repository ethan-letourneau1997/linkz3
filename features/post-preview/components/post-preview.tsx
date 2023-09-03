import Link from "next/link";
import { Post } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { Suspense } from "react";
import { VotePlaceholer } from "@/features/post-votes/components/vote-placeholder";

import { PostPreviewPostedIn } from "./post-preview-posted-in";
import { PostPreviewPostedBy } from "./post-preview-posted-by";
import { PostPreviewCommentCount } from "./get-preview-comment-count";

type SpacePreviewProps = {
  post: Post;
};

const SKELETON_FALLBACK = (
  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
);

export async function PostPreview({ post }: SpacePreviewProps) {
  return (
    <div className="grid grid-cols-12 px-2 py-3 border-neutral-500">
      <div className="col-span-11">
        <Link
          className=" hover:underline"
          // href={`/spaces/${post.id}/${post.title}`}
          href="#"
        >
          {post.title}
        </Link>

        <Suspense fallback={SKELETON_FALLBACK}>
          <PostPreviewPostedIn post={post} />
        </Suspense>
        <Suspense fallback={SKELETON_FALLBACK}>
          <PostPreviewPostedBy post={post} />
        </Suspense>
        <Suspense fallback={SKELETON_FALLBACK}>
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
