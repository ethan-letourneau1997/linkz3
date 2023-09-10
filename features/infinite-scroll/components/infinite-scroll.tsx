// import { InitialPosts } from "./initial-posts";
import { LoadMore } from "./load-more";
import { Posts } from "./posts";
import { SortPosts } from "./sort-posts";
import { fetchNewPosts } from "../api/fetch-new-posts";
import { fetchOldPosts } from "../api/fetch-old-posts";
import { fetchTopPosts } from "../api/fetch-top-posts copy";

export async function InfiniteScroll() {
  // const initialPosts = await fetchPosts(1);

  return (
    <div className="w-full max-w-3xl mt-5 space-y-4">
      {/* <InitialPosts posts={initialPosts} /> */}
      <SortPosts
        newPosts={<NewPosts />}
        oldPosts={<OldPosts />}
        topPosts={<TopPosts />}
      />

      {/* <Posts posts={posts} />
      <LoadMore /> */}
    </div>
  );
}

export async function NewPosts() {
  // const initialPosts = await fetchPosts(1);
  const posts = await fetchNewPosts(1);

  return (
    <>
      <Posts posts={posts} />
      <LoadMore />
    </>
  );
}

export async function OldPosts() {
  // const initialPosts = await fetchPosts(1);
  const posts = await fetchOldPosts(1);

  return (
    <>
      <Posts posts={posts} />
      <LoadMore />
    </>
  );
}

export async function TopPosts() {
  // const initialPosts = await fetchPosts(1);
  const posts = await fetchTopPosts(1);

  return (
    <>
      <Posts posts={posts} />
      <LoadMore />
    </>
  );
}
