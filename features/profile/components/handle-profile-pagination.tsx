"use client";

import { ProfileCommentPagination } from "./profile-comment-pagination";
import { ProfilePostPagination } from "./profile-post-pagination";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HandleProfilePagination() {
  const pathname = usePathname();

  useEffect(() => {}, [pathname]);

  if (pathname.includes("/posts")) return <ProfilePostPagination />;

  if (pathname.includes("/comments")) return <ProfileCommentPagination />;
}
