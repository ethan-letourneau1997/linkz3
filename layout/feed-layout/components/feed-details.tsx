"use client";

import { SortPosts } from "@/features/sort-posts";

export function FeedDetails() {
  return (
    <div className="w-full max-w-3xl mt-5 ">
      <h1 className="text-2xl font-bold tracking-tight text-center ">
        My Feed
      </h1>

      <SortPosts pathname={`/subscriptions/feed/`} />
    </div>
  );
}
