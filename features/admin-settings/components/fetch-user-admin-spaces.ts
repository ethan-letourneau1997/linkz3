"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchUserAdminSpaces() {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    const { data: spaces } = await supabase
      .from("community")
      .select()
      .eq("created_by", data.session.user.id);

    if (spaces) {
      const sortedSpaces = spaces.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      return sortedSpaces;
    }

    if (!spaces) {
      return [];
    }
  }
}
