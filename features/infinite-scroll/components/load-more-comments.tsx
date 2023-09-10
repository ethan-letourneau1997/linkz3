"use client";

import { useEffect, useState } from "react";

import { Comment } from "@/types";
import { Comments } from "./comments";
import { Spinner } from "./spinner";
import { fetchComments } from "../api/fetch-comments";
import { useInView } from "react-intersection-observer";

export function LoadMoreComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  // Pages already loaded
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [morePosts, setMorePosts] = useState(true);

  const { ref, inView } = useInView();

  const loadMoreComments = async () => {
    const nextPage = pagesLoaded + 1;

    const newComments = (await fetchComments(nextPage)) ?? [];
    if (newComments.length === 0) {
      setMorePosts(false);
    }

    setComments((prevComments: Comment[]) => [...prevComments, ...newComments]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreComments();
    }
  }, [inView]);

  return (
    <>
      <Comments comments={comments} />
      {morePosts ? (
        <div className="flex items-center justify-center p-4" ref={ref}>
          <Spinner />
        </div>
      ) : (
        <div>no more posts to load</div>
      )}
    </>
  );
}
