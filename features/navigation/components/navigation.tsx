import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { MobileSpaceName } from "./mobile-space-name";
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
    <nav className="w-full border-b dark:border-dark-800 dark:bg-dark-900 bg-neutral-50">
      <DesktopNavigation profile={public_profile} />
      <div className="grid items-center grid-cols-3 px-2 md:hidden h-14">
        <MobileNavigation profile={public_profile} />
        <div className="block text-center md:hidden">
          <MobileSpaceName />
        </div>
      </div>

      {/* <div className="w-full dark:bg-neutral-900">
      <MovileNavigation user={user} profile={public_profile} />
      <DesktopNavigation user={user} profile={public_profile} />
     </div> */}
    </nav>
  );
}
