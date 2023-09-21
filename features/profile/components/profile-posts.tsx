import { PostPreviews } from "@/features/post-preview";
import { getSortedProfilePosts } from "../api/get-sorted-profile-posts";

type ProfilePostsProps = {
  params: {
    username: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function ProfilePosts({ params }: ProfilePostsProps) {
  // const posts = await getPosts();

  const posts = await getSortedProfilePosts(
    params.sort,
    params.username,
    params.page
  );

  if (posts && posts.length > 0) return <PostPreviews posts={posts} />;

  if (posts && posts.length === 0)
    return (
      <div className="mt-10 text-center text-neutral-300">
        {params.username} has not made any posts.
      </div>
    );
}
