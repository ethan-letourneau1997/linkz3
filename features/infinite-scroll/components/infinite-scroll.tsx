import { LoadMore } from "./load-more";
import { Posts } from "./posts";
import { fetchPosts } from "../api/fetch-posts";

export async function InfiniteScroll() {
  const posts = await fetchPosts(1);

  return (
    <div className="w-full max-w-3xl mt-5 space-y-4">
      <Posts posts={posts} />
      <LoadMore />
    </div>
  );
}
