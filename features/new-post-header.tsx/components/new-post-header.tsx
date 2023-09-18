"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Card } from "@/components/ui/card";
import { SortTabs } from "@/features/sort-tabs.tsx";

export function NewPostHeader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const pathname = usePathname();

  function handleNavigateToCreate() {
    if (pathname.includes("/spaces")) {
      router.push(`${pathname}/create`);
    }

    router.push(`/create/post`);
  }

  if (sort && page)
    return (
      <Card className="flex items-center gap-5 px-4 py-3 mt-5">
        <SortTabs />
        <div className="flex-grow ">
          <button
            onClick={handleNavigateToCreate}
            className="w-full rounded shadow-sm h-9 dark:bg-neutral-800 "
          >
            New Post
          </button>
        </div>
      </Card>
    );
}
