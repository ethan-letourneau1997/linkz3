"use client";

import { ProfileDisplaySelect } from "../../space-layout/components/profile-display-select";
import { SortPosts } from "@/features/sort-posts";
import { useParams } from "next/navigation";

export function ProfileDetails() {
  const params = useParams();

  return (
    <div>
      <div className="py-3 mt-2 text-2xl font-semibold text-center">
        {params.username}
      </div>
      <div className="flex gap-1">
        <ProfileDisplaySelect pathname={`/profile/${params.username}`} />
        <SortPosts pathname={`/profile/${params.username}/${params.type}`} />
      </div>
    </div>
  );
}
