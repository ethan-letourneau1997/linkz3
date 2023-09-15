"use client";

import { SortPosts } from "@/features/sort-posts";
import { useParams } from "next/navigation";

export function SpaceDetails() {
  const params = useParams();

  return (
    <div className="mt-3 ">
      <div className="hidden py-3 text-2xl font-semibold text-center md:block">
        {params.spaceName}
      </div>
      <div className="pl-2 md:pl-0">
        <SortPosts pathname={`/spaces/${params.spaceId}/${params.spaceName}`} />
      </div>
    </div>
  );
}
