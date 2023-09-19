"use server";

import { PublicProfile } from "@/types";
import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertUserBio(user: PublicProfile, bio: string) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from("public_profile")
        .upsert({
          id: user.id,
          avatar: user.avatar,
          avatar_filename: user.avatar_filename,
          username: user.username,
          biography: bio,
        })
        .select();
      revalidatePath(`/profile`);
    } catch (e) {
      return e;
    }
  }
}
