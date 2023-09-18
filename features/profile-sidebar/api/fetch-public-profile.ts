"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function fetchPublicProfile(username: string) {


  const supabase = createServerActionClient({ cookies });

  try {
    const { data } = await supabase
      .from("public_profile")
      .select("*")
      .eq("username", username)
      .single();
    return data;
  } catch (e) {
    console.log(e);
  }
  }

