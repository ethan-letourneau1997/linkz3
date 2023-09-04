import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SpaceSkeleton({ count }: { count: number }) {
  // Create an array of length 'count' to render 'count' Skeleton components
  const skeletonElements = Array.from({ length: count }, (item, index) => (
    <div
      key={index}
      className="grid grid-cols-12 gap-3 px-2 py-3 border-neutral-500 "
    >
      <div className="col-span-2">
        <Skeleton className="w-full h-full" />
      </div>
      <div className=" col-span-9  h-[96px] grid grid-rows-4 items-center">
        <Skeleton className="w-3/4 h-[18px] py-[6px]" />
        <Skeleton className="w-1/4 h-[18px] py-[6px]" />
        <Skeleton className="w-1/3 h-[18px] py-[6px]" />
        <Skeleton className="w-1/4 h-[18px] py-[6px]" />
      </div>
      <div className="flex justify-end col-span-1 "></div>
    </div>
  ));

  return <>{skeletonElements}</>;
}
