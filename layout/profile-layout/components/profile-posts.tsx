import { PostPreviews } from "@/features/post-preview";
import { getSortedProfilePosts } from "../api/get-sorted-profile-posts";

type ProfilePostsProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
    username: string;
    type: "post" | "comment";
  };
};

export async function ProfilePosts({ params }: ProfilePostsProps) {
  // const posts = await getPosts();

  const posts = await getSortedProfilePosts(
    params?.sortBy,
    params?.username,
    params.page
  );

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
