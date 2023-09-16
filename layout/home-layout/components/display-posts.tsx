import { Post } from "@/types";
import { PostPreviews } from "@/features/post-preview";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type DisplayPostProps = {
  sortBy: "top" | "new" | "old";
};

export async function DisplayPosts({ sortBy }: DisplayPostProps) {
  const posts: Post[] = await getSortedSubscriptionPosts(sortBy);

  return <PostPreviews posts={posts} />;
}
