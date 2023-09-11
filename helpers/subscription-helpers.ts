"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function createSubscription(spaceId: number) {
  const supabase = createServerActionClient({ cookies });

  await supabase.from("user_community").insert({ community_id: spaceId });

  revalidatePath(`/spaces`);
}

export async function deleteSubscription(spaceId: number) {
  const supabase = createServerActionClient({ cookies });

  await supabase
    .from("user_community")
    .delete()
    .match({ community_id: spaceId });

  revalidatePath(`/spaces`);
}
