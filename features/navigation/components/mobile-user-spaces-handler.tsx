import { MobileSpaces } from "./mobile-spaces";
import { PublicProfile } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type MobileUserSpaceHandlerProps = {
  profile: PublicProfile;
};

export async function MobileUserSpacesHandler({
  profile,
}: MobileUserSpaceHandlerProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: user_spaces } = await supabase
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", profile.id);

  return <MobileSpaces userSpaces={user_spaces || []} />;
}
