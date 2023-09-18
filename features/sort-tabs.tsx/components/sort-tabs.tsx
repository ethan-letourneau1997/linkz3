"use client";

import { usePathname, useSearchParams } from "next/navigation";

import Link from "next/link";

export function SortTabs() {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const pathname = usePathname();

  if (sort && page)
    return (
      <div className="text-sm">
        <Link
          href={`${pathname}?page=${page}&sort=new`}
          className={`${
            sort === "new" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          New
        </Link>
        <Link
          href={`${pathname}?page=${page}&sort=top`}
          className={`${
            sort === "top" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          Top
        </Link>
        <Link
          href={`${pathname}?page=${page}&sort=old`}
          className={`${
            sort === "old" ? "border-b" : ""
          } border-indigo-500 px-4 pb-1 hover:cursor-pointer`}
        >
          Old
        </Link>
      </div>
    );
}
