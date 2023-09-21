import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PreviewSkeleton({ count }: { count: number }) {
  const skeletonElements = Array.from({ length: count }, (_, index) => (
    <div key={index}>
      <div className="grid w-full max-w-3xl grid-cols-12 gap-2 px-2 py-3 sm:hidden">
        <div className="flex flex-col justify-between col-span-9 ">
          <Skeleton className="h-3" />
          <Skeleton className="h-3 " />
          <Skeleton className="h-3 " />
        </div>
        <div className="col-span-3 aspect-[4/3]">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <Skeleton className="w-full h-[110px]  hidden sm:block max-w-3xl " />
    </div>
  ));

  return <div className="space-y-0 sm:space-y-2">{skeletonElements}</div>;
}
