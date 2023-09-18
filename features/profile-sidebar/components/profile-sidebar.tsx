"use client";

import { Suspense } from "react";
import { UserDetails } from "./user-details";
import { useParams } from "next/navigation";

export function ProfileSidebar() {
  const params = useParams();

  const username = params.username as string;

  return (
    <div className="px-4 pb-3 space-y-3 w-72">
      <h2 className="text-lg font-semibold text-center">{username}</h2>
      <Suspense fallback={<div className="h-[50vh]">Loading...</div>}>
        <UserDetails />
      </Suspense>
    </div>
  );
}
