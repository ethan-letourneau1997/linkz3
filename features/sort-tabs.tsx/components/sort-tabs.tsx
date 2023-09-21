"use client";

import { useParams, usePathname } from "next/navigation";

import Link from "next/link";

function replacePathSegment(
  path: string,
  oldSegment: string,
  newSegment: string
) {
  // Split the path into an array of segments
  const segments = path.split("/");

  // Find the index of the old segment
  const index = segments.indexOf(oldSegment);

  // If the old segment exists in the path, replace it with the new segment
  if (index !== -1) {
    segments[index] = newSegment;
  }

  // Always set the last number to 1
  segments[segments.length - 1] = "1";

  // Join the segments back into a path string
  const newPath = segments.join("/");

  return newPath;
}

// Example usage:

export function SortTabs() {
  const params = useParams();

  const sort = params.sort;
  const page = params.page;
  const pathname = usePathname();

  if (sort && page)
    return (
      <div className="text-sm">
        <Link
          href={`${replacePathSegment(pathname, params.sort as string, "new")}`}
          className={`${
            sort === "new" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          New
        </Link>
        <Link
          href={`${replacePathSegment(pathname, params.sort as string, "top")}`}
          className={`${
            sort === "top" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          Top
        </Link>
        <Link
          href={`${replacePathSegment(pathname, params.sort as string, "old")}`}
          className={`${
            sort === "old" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          Old
        </Link>
      </div>
    );
}
