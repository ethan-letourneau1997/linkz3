"use server";

import { Space } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertSpaceDescription(space: Space, description: string) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from("community")
        .upsert({
          id: space.id,
          name:space.name,
          description: description,
        })
        .select();
      revalidatePath(`/spaces/${space.id}/${space.name}/settings`);
    } catch (e) {
      return e;
    }
  }
}
