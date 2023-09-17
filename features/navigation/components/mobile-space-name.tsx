"use client";

import { useParams } from "next/navigation";
import { usePathname } from "next/navigation";

export function MobileSpaceName() {
  const params = useParams();
  const pathname = usePathname();

  if (pathname.includes("/create"))
    return <div className="text-lg font-semibold">Create Post</div>;

  if (params.spaceName)
    return <div className="text-lg font-semibold">{params.spaceName}</div>;
}
