import { LoggedOutHome } from "./logged-out-home";
import { UsernameForm } from "@/features/username-form";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export async function HomeLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", data.session?.user.id)
    .single();

  if (!data.session) return <LoggedOutHome />;

  if (!public_profile) return <UsernameForm />;

  if (data.session) return redirect("/subscriptions/feed?page=1&sort=new");
}
