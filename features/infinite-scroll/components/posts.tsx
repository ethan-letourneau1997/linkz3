import { PostPreview } from "./client-post-preview";
import { PostPreview as PostPreviewProps } from "@/types";
import { Suspense } from "react";

type PostsProps = {
  posts: PostPreviewProps[] | null;
};

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts ? (
        <>
          {posts.map((post) => (
            <Suspense key={post.id} fallback={<div>Loading...</div>}>
              <PostPreview key={post.id} post={post} />
            </Suspense>
          ))}
        </>
      ) : (
        <div>No posts available!</div>
      )}
    </>
  );
}
