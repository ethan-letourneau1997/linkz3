"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createSpace(spaceName: string, description: string) {
  const supabase = createServerActionClient({ cookies });

  const { data } = await supabase
    .from("community")
    .insert({
      name: spaceName,
      description: description,
    })
    .select()
    .single();

  if (data) {
    revalidatePath(`/spaces/`);

    redirect(`/spaces/${data.id}/${data.name}`);
  }
}
