"use client";

import { ProfileDisplaySelect } from "./profile-display-select";
import { SortPosts } from "@/features/sort-posts";
import { useParams } from "next/navigation";

export function ProfileDetails() {
  const params = useParams();

  return (
    <div>
      <div className="py-3 mt-2 text-2xl font-semibold text-center">
        {params.username}
      </div>
      <div className="flex gap-1 px-2 md:px-0">
        <ProfileDisplaySelect pathname={`/profile/${params.username}`} />
        <SortPosts pathname={`/profile/${params.username}/${params.type}`} />
      </div>
    </div>
  );
}
