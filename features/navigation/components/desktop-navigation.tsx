import { AuthButtons } from "./auth-buttons";
import Link from "next/link";
import { NewDropdown } from "./new-dropdown";
import { PublicProfile } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserSpacesHandler } from "./user-spaces-handler";

type DesktopNavigationProps = {
  profile: PublicProfile | null;
};

export function DesktopNavigation({ profile }: DesktopNavigationProps) {
  return (
    <div className="items-center justify-between hidden w-full max-w-3xl mx-auto text-sm h-14 md:flex">
      <div className="flex items-center gap-4">
        {profile && <UserSpacesHandler profile={profile} />}
        <Link className="hover:text-white" href="/">
          Home
        </Link>
        <Link className="hover:text-white" href="/spaces">
          Spaces
        </Link>
        <NewDropdown />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AuthButtons profile={profile} />
      </div>
    </div>
  );
}
