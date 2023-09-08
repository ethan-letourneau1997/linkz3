import { PostPreview, PreviewSkeleton } from "@/features/post-preview";

import { Post } from "@/types";
import { Suspense } from "react";

type PostPreviewsProps = {
  posts: Post[];
};

export async function PostPreviews({ posts }: PostPreviewsProps) {
  return (
    <div className="w-full max-w-3xl">
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
      </Suspense>
    </div>
  );
}
