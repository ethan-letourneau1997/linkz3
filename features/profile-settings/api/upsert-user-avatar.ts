"use server";

import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";

export async function upsertUserAvatar(avatarUrl: string) {
  const supabase = createServerActionClient({ cookies });
  const { data } = await supabase.auth.getSession();

if(data.session){
    try {
        await supabase
        .from("public_profile")
        .upsert({
          id: data.session.user.id,
          avatar: avatarUrl,
        })
        .select();


    revalidatePath(`/settings/profile`);
    }catch(e){
        return 
    }
  
}




  


   
}
