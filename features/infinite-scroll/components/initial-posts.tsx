import { PostPreview } from "@/features/post-preview";
import { PostPreview as PostPreviewProps } from "@/types";

type PostsProps = {
  posts: PostPreviewProps[] | null;
};

export function InitialPosts({ posts }: PostsProps) {
  return (
    <>
      {posts ? (
        <>
          {posts.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
        </>
      ) : (
        <div>No posts available!</div>
      )}
    </>
  );
}
