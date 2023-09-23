import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function SpaceSidebarFallback() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Skeleton className="rounded-full w-14 h-14" />
        <Skeleton className="flex-grow h-4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>

      <Separator />
      <Skeleton className="h-4" />
    </>
  );
}
