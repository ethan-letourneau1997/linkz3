import { AvatarDropdown } from "./avatar-dropdown";
import { PublicProfile } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type AvatarDropdownHandlerProps = {
  profile: PublicProfile;
};

export async function AvatarDropdownHandler({
  profile,
}: AvatarDropdownHandlerProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user_spaces } = await supabase
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", profile.id);

  return <AvatarDropdown profile={profile} userSpaces={user_spaces || []} />;
}
