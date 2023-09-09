"use client";

import { SortPosts } from "@/features/sort-posts";
import { useParams } from "next/navigation";

export function SpaceDetails() {
  const params = useParams();

  return (
    <div>
      <div className="py-3 mt-2 text-2xl font-semibold text-center">
        {params.spaceName}
      </div>
      <SortPosts pathname={`/spaces/${params.spaceId}/${params.spaceName}`} />
    </div>
  );
}
