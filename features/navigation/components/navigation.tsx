import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
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
    <nav className="w-full border-b border-neutral-800">
      <DesktopNavigation profile={public_profile} />
      <div className="flex items-center px-2 md:hidden h-14">
        <MobileNavigation profile={public_profile} />
      </div>

      {/* <div className="w-full dark:bg-neutral-900">
      <MovileNavigation user={user} profile={public_profile} />
      <DesktopNavigation user={user} profile={public_profile} />
     </div> */}
    </nav>
  );
}
