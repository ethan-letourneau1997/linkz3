"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function checkUserSubscription(spaceId: string) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      const { data: user_community } = await supabase
        .from("user_community")
        .select()
        .match({
          user_id: data.session.user.id,
          community_id: spaceId,
        });

      if (!user_community) return false;

      if (user_community && user_community.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }

  
}
