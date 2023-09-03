import { Space } from "@/types";

import Link from "next/link";
import { SpaceMemberCount } from "./space-member-count";

type SpacePreviewProps = {
  space: Space;
};

export function SpacePreview({ space }: SpacePreviewProps) {
  return (
    <div className="px-10 py-2 mt-5 border border-neutral-500">
      <Link
        className="font-semibold hover:underline"
        href={`/spaces/${space.id}/${space.name}`}
      >
        {space.name}
      </Link>
      <SpaceMemberCount space={space} />
    </div>
  );
}
