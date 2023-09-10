"use client";

import { useEffect, useState } from "react";

import { PostPreview } from "@/types";
import { Posts } from "./posts";
import { Spinner } from "./spinner";
import { fetchPosts } from "../api/fetch-posts";
import { useInView } from "react-intersection-observer";

export function LoadMore() {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  // Pages already loaded
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [morePosts, setMorePosts] = useState(true);

  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;

    const newPosts = (await fetchPosts(nextPage)) ?? [];
    if (newPosts.length === 0) {
      setMorePosts(false);
    }
    setPosts((prevPosts: PostPreview[]) => [...prevPosts, ...newPosts]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
    }
  }, [inView]);

  return (
    <>
      <Posts posts={posts} />
      <div className="flex items-center justify-center p-4" ref={ref}>
        {morePosts ? (
          <div className="flex items-center justify-center p-4" ref={ref}>
            <Spinner />
          </div>
        ) : (
          <div>no more posts to load</div>
        )}
      </div>
    </>
  );
}
