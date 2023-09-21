import { PostPreviews } from "@/features/post-previews";
import { getSortedPosts } from "../api/get-sorted-posts";

type SpacePostsProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function SpacePosts({ params, searchParams }: SpacePostsProps) {
  const posts = await getSortedPosts(
    params.spaceId,
    searchParams.page,
    searchParams.sort
  );

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
