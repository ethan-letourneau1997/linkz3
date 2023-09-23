"use client";

import { MdOutlineEvent } from "react-icons/md";
import { Space } from "@/types";
import { formatCreatedAt } from "@/lib/utils/format-created-at";

type SpaceSidebarDetailsProps = {
  space: Space;
};

export function SpaceSidebarDetails({ space }: SpaceSidebarDetailsProps) {
  if (space)
    return (
      <div className="pt-2">
        <p className="text-sm ">{space.description}</p>
        <p className="flex items-center gap-1 mt-2 text-sm dark:text-neutral-500">
          <MdOutlineEvent />
          Created {space.created_at && formatCreatedAt(space.created_at)}
        </p>
      </div>
    );
}
