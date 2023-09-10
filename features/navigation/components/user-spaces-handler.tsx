import { UserSpaces } from "./user-spaces-search";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type UserSpaceHandlerProps = {
  userId: string;
};

export async function UserSpacesHandler({ userId }: UserSpaceHandlerProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user_spaces } = await supabase
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", userId);

  return (
    <div>
      <UserSpaces userSpaces={user_spaces || []} />
    </div>
  );
}
