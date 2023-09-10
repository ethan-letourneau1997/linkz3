import { Post } from "@/types";

type PostsProps = {
  posts: Post[] | null;
};

export function Posts({ posts }: PostsProps) {
  return (
    <>
      {posts ? (
        <>
          {posts.map((post) => (
            <div key={post.id} className="py-10 bg-neutral-700">
              <div className="text-3xl font-bold">{post.id}</div>
              <div>{post.title}</div>
            </div>
          ))}
        </>
      ) : (
        <div>No posts available!</div>
      )}
    </>
  );
}
