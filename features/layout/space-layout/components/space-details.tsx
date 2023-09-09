"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export function SpaceDetails() {
  const params = useParams();

  const activeLinkStyles = "font-medium bg-neutral-800 rounded-lg";

  return (
    <div>
      <div className="py-3 mt-2 text-2xl font-semibold text-center">
        {params.spaceName}
      </div>

      <div className="flex gap-2">
        <Link
          className={`${
            params.sortBy === "top" ? activeLinkStyles : ""
          } px-4 py-1`}
          href={`/spaces/${params.spaceId}/${params.spaceName}/top/1`}
        >
          Top
        </Link>
        <Link
          className={`${
            params.sortBy === "new" ? activeLinkStyles : ""
          } px-4 py-1`}
          href={`/spaces/${params.spaceId}/${params.spaceName}/new/1`}
        >
          New
        </Link>
        <Link
          className={`${
            params.sortBy === "old" ? activeLinkStyles : ""
          } px-4 py-1`}
          href={`/spaces/${params.spaceId}/${params.spaceName}/old/1`}
        >
          Old
        </Link>
      </div>
    </div>
  );
}
