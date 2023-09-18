import { PostPreviews } from "@/features/post-preview";
import { getSortedProfilePosts } from "../api/get-sorted-profile-posts";

type ProfilePostsProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
  params: {
    username: string;
  };
};

export async function ProfilePosts({
  params,
  searchParams,
}: ProfilePostsProps) {
  // const posts = await getPosts();

  const posts = await getSortedProfilePosts(
    searchParams?.sort,
    params?.username,
    searchParams.page
  );

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
