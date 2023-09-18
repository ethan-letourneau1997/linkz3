"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import Link from "next/link";

export function SpaceHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const pathname = usePathname();

  function handleNavigateToCreate() {
    router.push(`${pathname}/create`);
  }

  if (sort && page)
    return (
      <Card className="flex items-center gap-5 px-4 py-3 mt-5">
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
        <div className="flex-grow ">
          <button
            onClick={handleNavigateToCreate}
            className="w-full rounded shadow-sm h-9 dark:bg-neutral-800 "
          >
            New Post
          </button>
        </div>

        {/* <div>
        <SortPosts />
      </div> */}
      </Card>
    );
}
