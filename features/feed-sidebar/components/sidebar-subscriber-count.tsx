import { FaUserAstronaut } from "react-icons/fa";
import { fetchSpaceSubscriberCount } from "@/lib/space/fetch-space-subscriber-count";

type SidebarSubscriberCountProps = {
  spaceId: number;
};

export async function SidebarSubscriberCount({
  spaceId,
}: SidebarSubscriberCountProps) {
  const subscriberCount = await fetchSpaceSubscriberCount(spaceId);

  return (
    <div className="flex items-center gap-1">
      <FaUserAstronaut />
      {subscriberCount}
    </div>
  );
}
