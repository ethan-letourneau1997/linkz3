"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { SortTabs } from "@/features/sort-tabs.tsx";

export function NewPostHeader() {
  const params = useParams();
  const router = useRouter();
  const sort = params.sort;
  const page = params.page;
  const pathname = usePathname();

  function handleNavigateToCreate() {
    if (pathname.includes("spaces")) {
      router.push(`${pathname}/create`);
    } else {
      router.push(`/create/post`);
    }
  }

  if (sort && page)
    return (
      <Card className="flex items-center max-w-3xl gap-5 px-4 py-3 mt-5">
        <SortTabs />
        <div className="flex-grow ">
          <button
            onClick={handleNavigateToCreate}
            className="w-full rounded shadow-sm h-9 dark:bg-neutral-800 dark:text-neutral-300"
          >
            New Post
          </button>
        </div>
      </Card>
    );
}

export function NewPostHeaderFallback() {
  return (
    <Card className="flex items-center max-w-3xl gap-5 px-4 py-3 mt-5">
      <SortTabsFallback />
      <div className="flex-grow ">
        <button className="w-full rounded shadow-sm h-9 dark:bg-neutral-800 dark:text-neutral-300">
          New Post
        </button>
      </div>
    </Card>
  );
}

export function SortTabsFallback() {
  return (
    <div className="flex text-sm">
      <div
        className={` border-indigo-500 px-4 pb-1 hover:cursor-pointer border-b`}
      >
        New
      </div>
      <div className={` border-indigo-500 px-4 pb-1 hover:cursor-pointer`}>
        Top
      </div>
      <div className={` border-indigo-500 px-4 pb-1 hover:cursor-pointer`}>
        Old
      </div>
    </div>
  );
}
