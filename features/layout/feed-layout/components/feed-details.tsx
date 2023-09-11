"use client";

import { SortPosts } from "@/features/sort-posts";

export function FeedDetails() {
  return (
    <div>
      <div className="py-3 mt-2 text-2xl font-semibold text-center">
        My Subscriptions
      </div>
      <SortPosts pathname={`/subscriptions/feed/`} />
    </div>
  );
}
