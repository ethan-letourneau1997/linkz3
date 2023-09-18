import { Space } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FaUserAstronaut } from "react-icons/fa";
import Link from "next/link";

export async function FeedSidebar() {
  const supabase = createServerComponentClient({ cookies });

  async function getUserSubscriptions() {
    const { data } = await supabase.auth.getSession();
    console.log(data);

    if (data.session) {
      const { data: user_spaces } = await supabase
        .from("user_community")
        .select("*, community_id(*)")
        .eq("user_id", data.session.user.id);

      if (user_spaces) {
        const sortedSpaces = user_spaces.sort((a, b) =>
          a.community_id.name.localeCompare(b.community_id.name)
        );

        return sortedSpaces;
      }

      if (!user_spaces) {
        return [];
      }
    }
  }

  const userSubscriptions = await getUserSubscriptions();

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

type SidebarSpacePreviewProps = {
  space: Space;
};

export async function SidebarSpacePreview({ space }: SidebarSpacePreviewProps) {
  return (
    <div className="pt-2">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 pb-2">
          <Avatar className="w-6 h-6 rounded-sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Link
            className="hover:underline"
            href={`/spaces/${space.id}/${space.name}?page=1&sort=new`}
          >
            {space.name}
          </Link>
        </div>
        <SidebarSubscriberCount spaceId={space.id} />
      </div>
      <Separator />
    </div>
  );
}

type SidebarSubscriberCountProps = {
  spaceId: number;
};

export async function SidebarSubscriberCount({
  spaceId,
}: SidebarSubscriberCountProps) {
  const supabase = createServerComponentClient({ cookies });
  const { count } = await supabase
    .from("user_community")
    .select("*", { count: "exact", head: true })
    .eq("community_id", spaceId);

  return (
    <div className="flex items-center gap-1">
      <FaUserAstronaut />
      {count}
    </div>
  );
}
