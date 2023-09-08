import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PreviewSkeleton({ count }: { count: number }) {
  // Create an array of length 'count' to render 'count' Skeleton components
  const skeletonElements = Array.from({ length: count }, () => (
    <>
      <div className="grid grid-cols-12 gap-2 px-2 py-3 sm:hidden">
        <div className="flex flex-col justify-between col-span-9 ">
          <Skeleton className="h-3" />
          <Skeleton className="h-3 " />
          <Skeleton className="h-3 " />
        </div>
        <div className="col-span-3 aspect-[4/3]">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <Skeleton className="w-full h-[110px] mt-2 hidden sm:block" />
    </>
  ));

  return <>{skeletonElements}</>;
}
