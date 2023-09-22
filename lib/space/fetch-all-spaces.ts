"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchAllSpaces() {
  const supabase = createServerActionClient({ cookies });

  const { data: spaces } = await supabase.from("community").select("*");
  return spaces;
}
