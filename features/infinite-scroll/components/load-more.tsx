"use client";

import { useEffect, useState } from "react";

import { Post } from "@/types";
import { Posts } from "./posts";
import { Spinner } from "./spinner";
import { fetchPosts } from "../api/fetch-posts";
import { useInView } from "react-intersection-observer";

export function LoadMore() {
  const [posts, setPosts] = useState<Post[]>([]);
  // Pages already loaded
  const [pagesLoaded, setPagesLoaded] = useState(1);

  const { ref, inView } = useInView();

  const loadMorePosts = async () => {
    const nextPage = pagesLoaded + 1;

    const newPosts = (await fetchPosts(nextPage)) ?? [];
    console.log(newPosts);
    setPosts((prevPosts: Post[]) => [...prevPosts, ...newPosts]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMorePosts();
      console.log(posts);
    }
  }, [inView]);

  return (
    <>
      <Posts posts={posts} />
      <div className="flex items-center justify-center p-4" ref={ref}>
        <Spinner />
      </div>
    </>
  );
}
