import { PostPreview } from "./client-post-preview";
import { PostPreview as PostPreviewProps } from "@/types";

type PostsProps = {
  posts: PostPreviewProps[] | null;
};

export function Posts({ posts }: PostsProps) {
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
