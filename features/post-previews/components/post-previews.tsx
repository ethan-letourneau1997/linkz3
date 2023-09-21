import { Post } from "@/types";
import { PostPreview } from "./post-preview";
import { PreviewSkeleton } from "./preview-skeleton";
import { Suspense } from "react";

type PostPreviewsProps = {
  posts: Post[];
};

export async function PostPreviews({ posts }: PostPreviewsProps) {
  if (posts)
    return (
      <div className="w-full max-w-3xl mt-3 space-y-0 border-b sm:space-y-2 md:border-0 border-neutral-800">
        <Suspense fallback={<PreviewSkeleton count={10} />}>
          {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
        </Suspense>
      </div>
    );
}
