import { Space } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type SpaceMemberCountProps = {
  space: Space;
};

export async function SpaceMemberCount({ space }: SpaceMemberCountProps) {
  const supabase = createServerComponentClient({ cookies });

  const { count } = await supabase
    .from("user_community")
    .select("*", { count: "exact", head: true })
    .eq("community_id", space.id);

  return (
    <>
      {count} {count === 1 ? "member" : "members"}
    </>
  );
}
