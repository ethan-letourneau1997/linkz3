import { PostPreview, SpaceSkeleton } from "@/features/post-preview";

import { Post } from "@/types";
import { Suspense } from "react";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type DisplayPostProps = {
  sortBy: "top" | "new" | "old";
};

export async function DisplayPosts({ sortBy }: DisplayPostProps) {
  const posts: Post[] = await getSortedSubscriptionPosts(sortBy);

  return (
    <div className="space-y-2">
      <Suspense fallback={<SpaceSkeleton count={10} />}>
        {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
      </Suspense>
    </div>
  );
}
