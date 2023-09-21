import { SidebarSpacePreview } from "./sidebar-space-preview";
import { fetchUserSpaces } from "@/lib/user/fetch-user-spaces";

export async function FeedSidebar() {
  const userSubscriptions = await fetchUserSpaces();

  return (
    <div className="px-4 pb-3 space-y-3 w-72 dark:text-neutral-300">
      <h2 className="text-lg font-semibold text-center">My Subscriptions</h2>
      <div className="space-y-0">
        {userSubscriptions?.map((space) => (
          <SidebarSpacePreview
            key={space.community_id.id}
            space={space.community_id}
          />
        ))}
      </div>
    </div>
  );
}
