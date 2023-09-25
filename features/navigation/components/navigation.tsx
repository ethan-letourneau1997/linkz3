import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { MobileSpaceName } from "./mobile-space-name";
import { fetchLoggedInProfile } from "@/lib/user/fetch-logged-in-profile";

export async function Navigation() {
  const profile = await fetchLoggedInProfile();

  return (
    <nav className="w-full border-b dark:border-dark-800 dark:bg-dark-900 bg-neutral-50 h-14">
      <DesktopNavigation profile={profile} />
      <div className="grid items-center grid-cols-3 px-2 md:hidden h-14">
        <MobileNavigation profile={profile} />
        <div className="block text-center md:hidden">
          <MobileSpaceName />
        </div>
      </div>
    </nav>
  );
}
