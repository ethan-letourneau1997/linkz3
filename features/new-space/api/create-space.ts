"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createSpace(spaceName: string, description: string,displayName?:string) {
  const supabase = createServerActionClient({ cookies });

  if(displayName){
    const { data } = await supabase
    .from("community")
    .insert({
      name: spaceName,
      display_name:displayName,
      description: description,
    })
    .select()
    .single();
    if (data) {
      revalidatePath(`/spaces/`);
  
      redirect(`/spaces/${data.id}/${data.name}`);
    }

  }

  if(!displayName){
    const { data } = await supabase
    .from("community")
    .insert({
      name: spaceName,
      display_name:spaceName,
      description: description,
    })
    .select()
    .single();

  if (data) {
    revalidatePath(`/spaces/`);

    redirect(`/spaces/${data.id}/${data.name}`);
  }
  }


}
