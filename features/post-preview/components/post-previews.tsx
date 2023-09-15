import { Post } from "@/types";
import { PostPreview } from "./post-preview";
import { PreviewSkeleton } from "@/features/post-preview";
import { Suspense } from "react";

type PostPreviewsProps = {
  posts: Post[];
};

export async function PostPreviews({ posts }: PostPreviewsProps) {
  return (
    <div className="w-full max-w-3xl mt-4 border-b md:border-0 border-neutral-800">
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
      </Suspense>
    </div>
  );
}
