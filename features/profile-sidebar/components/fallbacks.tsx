import { FaCommentAlt } from "react-icons/fa";
import { PiSignpostFill } from "react-icons/pi";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const postCountFallback = (
  <div className="flex flex-col items-center justify-center ">
    <div className="flex items-center gap-2 text-neutral-300">
      <PiSignpostFill />
      <span>{0}</span>
    </div>
    <div className="text-sm text-neutral-500">posts</div>
  </div>
);

export const commentCountFallback = (
  <div className="flex flex-col items-center justify-center ">
    <div className="flex items-center gap-2 text-neutral-300">
      <FaCommentAlt />
      <span>{0}</span>
    </div>
    <div className="text-sm text-neutral-500">comments</div>
  </div>
);

export const userDetailsFallback = (
  <>
    <div className="text-sm text-center">
      <Skeleton className="h-5" />
    </div>
    <Separator />

    <div className="grid grid-cols-2">
      {postCountFallback}
      {commentCountFallback}
    </div>
  </>
);
