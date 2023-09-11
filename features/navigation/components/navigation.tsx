import { DesktopNavigation } from "./desktop-navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function Navigation() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", user?.id)
    .single();

  return (
    <>
      <DesktopNavigation profile={public_profile} />

      {/* <div className="w-full dark:bg-neutral-900">
      <MovileNavigation user={user} profile={public_profile} />
      <DesktopNavigation user={user} profile={public_profile} />
     </div> */}
    </>
  );
}
