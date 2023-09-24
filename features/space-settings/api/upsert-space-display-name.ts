"use server";

import { Space } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertSpaceDisplayName(
  space: Space,
  displayName: string
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from("community")
        .upsert({
          id: space.id,
          name: space.name,
          description: space.description,
          display_name: displayName,
        })
        .select();
      revalidatePath(`/spaces/${space.id}/${space.name}/settings`);
    } catch (e) {
      return e;
    }
  }
}
