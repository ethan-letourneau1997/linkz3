import { PostPreviews } from "@/features/post-preview";
import { getSortedPosts } from "../api/get-sorted-posts";

type SpacePagePostsProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function SpacePagePosts({
  params,
  searchParams,
}: SpacePagePostsProps) {
  const posts = await getSortedPosts(
    params.spaceId,
    searchParams.page,
    searchParams.sort
  );

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
