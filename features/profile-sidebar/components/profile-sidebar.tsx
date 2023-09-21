"use client";

import { Suspense } from "react";
import { UserDetails } from "./user-details";
import { useParams } from "next/navigation";
import { SidebarAvatar } from "./sidebar-avatar";

export function ProfileSidebar() {
  const params = useParams();

  const username = params.username as string;

  return (
    <div className="px-4 pb-3 w-72 dark:text-neutral-200">
      {/* <div className="flex items-center justify-center gap-3">
        <SidebarAvatar />
        <h2 className="text-lg font-semibold ">{username}</h2>
      </div> */}

      <SidebarAvatar />

      <h2 className="mt-3 text-lg font-semibold text-center">{username}</h2>

      <Suspense fallback={<div className="h-[50vh]">Loading...</div>}>
        <UserDetails />
      </Suspense>
    </div>
  );
}
