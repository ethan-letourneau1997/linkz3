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

  const { ref, inView } = useInView();

  const loadMoreComments = async () => {
    const nextPage = pagesLoaded + 1;

    const newComments = (await fetchComments(nextPage)) ?? [];
    console.log(newComments);
    setComments((prevComments: Comment[]) => [...prevComments, ...newComments]);
    setPagesLoaded(nextPage);
  };

  useEffect(() => {
    if (inView) {
      loadMoreComments();
      console.log(comments);
    }
  }, [inView]);

  return (
    <>
      <Comments comments={comments} />
      <div className="flex items-center justify-center p-4" ref={ref}>
        <Spinner />
      </div>
    </>
  );
}
