import { Card } from "@/components/ui/card";
import { FaUserAstronaut } from "react-icons/fa";
import Link from "next/link";
import { Space } from "@/types";
import { SpaceOptionsDropdown } from "@/features/space-options-dropdown";
import { fetchSpaceSubscriberCount } from "@/lib/space/fetch-space-subscriber-count";

type AdminSpacePreviewProps = {
  space: Space;
};

export async function AdminSpacePreview({ space }: AdminSpacePreviewProps) {
  const subscriberCount = await fetchSpaceSubscriberCount(space.id);
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            className="font-medium hover:underline"
            href={`/spaces/${space.id}/${space.name}`}
          >
            {space.name}
          </Link>
          <span className="flex items-center gap-1 text-xs dark:text-neutral-400">
            <FaUserAstronaut />
            {subscriberCount}
          </span>
        </div>
        <SpaceOptionsDropdown space={space} />
      </div>
      <div className="dark:text-neutral-400">{space.description}</div>
    </Card>
  );
}
