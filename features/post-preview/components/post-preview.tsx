import { Post } from "@/types";
import { PostMobileImage } from "./post-mobile-image";
import { PostPreviewCommentCount } from "./get-preview-comment-count";
import { PostPreviewPostedBy } from "./post-preview-posted-by";
import { PostPreviewPostedIn } from "./post-preview-posted-in";
import { PostPreviewThumbnail } from "./post-preview-thumbnail";
import { PostPreviewTitle } from "./post-preview-title";
import { PostVotes } from "@/features/post-votes";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { VotePlaceholer } from "@/features/post-votes/components/vote-placeholder";

type PostPreviewProps = {
  post: Post;
  communityName?: string;
};

export async function PostPreview({ post, communityName }: PostPreviewProps) {
  return (
    <div className="grid grid-cols-12 gap-3 px-2 py-3 ">
      <div className="hidden md:block md:col-span-2">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PostPreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="col-span-12 space-y-1 md:col-span-9">
        <div className="flex items-center gap-1 md:block">
          <Suspense fallback={<Skeleton className="w-1/4 h-[18px] py-[6px]" />}>
            <PostPreviewPostedIn post={post} />
          </Suspense>
          <span className="md:hidden text-neutral-500">-</span>
          <Suspense fallback={<Skeleton className="w-1/3 h-[18px] py-[6px]" />}>
            <PostPreviewPostedBy post={post} />
          </Suspense>
        </div>
        <Suspense fallback={<div> {post.title}</div>}>
          <PostPreviewTitle post={post} communityName={communityName} />
        </Suspense>

        {post.type === "image" && (
          <div className="col-span-12 md:hidden md:col-span-2">
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <PostMobileImage post={post} />
            </Suspense>
          </div>
        )}

        <Suspense fallback={<Skeleton className="w-1/4 h-[18px] py-[6px]" />}>
          <div className="flex gap-2 md:block">
            <PostVotes post={post} horizontal />
            <PostPreviewCommentCount post={post} />
          </div>
        </Suspense>
      </div>
      <div className="justify-end hidden col-span-1 md:flex">
        <Suspense fallback={<VotePlaceholer />}>
          <PostVotes post={post} />
        </Suspense>
      </div>
    </div>
  );
}
