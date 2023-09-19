import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";
import { FaUserAstronaut } from "react-icons/fa";

type SidebarSubscriberCountProps = {
  spaceId: string;
};

export function SidebarSubscriberCount({
  spaceId,
}: SidebarSubscriberCountProps) {
  const supabase = createClientComponentClient();

  const { data: count } = useSWR("user_community", async () => {
    try {
      const { count } = await supabase
        .from("user_community")
        .select("*", { count: "exact", head: true })
        .eq("community_id", spaceId);

      return count;
    } catch (e) {
      console.log(e);
    }
  });

  if (count)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-2">
          <FaUserAstronaut className="text-sm" />
          <span className="text-sm">{count || 0}</span>
        </div>
        <div className="text-xs text-neutral-500">
          subscriber{count === 1 ? "" : "s"}
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center gap-2">
        <FaUserAstronaut className="text-sm" />
        <span className="text-sm">0</span>
      </div>
      <div className="text-xs text-neutral-500">subscribers</div>
    </div>
  );
}
