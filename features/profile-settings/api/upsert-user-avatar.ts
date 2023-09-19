"use server";

import { PublicProfile } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertUserAvatar(
  user: PublicProfile,
  avatarUrl: string,
  filename: string
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from("public_profile")
        .upsert({
          id: user.id,
          avatar: avatarUrl,
          avatar_filename: filename,
          username: user.username,
          biography: user.biography,
        })
        .select();

      revalidatePath(`/settings/profile`);
    } catch (e) {
      return;
    }
  }
}
