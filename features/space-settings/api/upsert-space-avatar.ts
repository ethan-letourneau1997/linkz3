"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertSpaceAvatar(
  spaceId: string | number,
  filePath: string,
  fileName: string
) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    try {
      await supabase
        .from("community_avatar")
        .upsert({
          id: spaceId,
          path: filePath,
          file_name: fileName,
        })
        .select();

      revalidatePath(`/settings/profile`);
    } catch (e) {
      return;
    }
  }
}
