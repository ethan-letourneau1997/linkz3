import { CardPostPreview } from "./card-post-preview";
import { Post } from "@/types";
import { PreviewSkeleton } from "@/features/post-preview";
import { Suspense } from "react";

type PostPreviewsProps = {
  posts: Post[];
};

export async function PostPreviews({ posts }: PostPreviewsProps) {
  return (
    <div className="w-full max-w-3xl mt-4">
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        {posts?.map((post) => <CardPostPreview key={post.id} post={post} />)}
      </Suspense>
      {/* <Suspense fallback={<PreviewSkeleton count={10} />}>
        {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
      </Suspense> */}
    </div>
  );
}
