import { AuthButtons } from "./auth-buttons";
import Link from "next/link";
import { NewPostDropdown } from "./new-post-dropdown";
import { PublicProfile } from "@/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { AvatarDropdownHandler } from "./avatar-dropdown-handler";
import { SpacesSearch } from "@/features/spaces-search.tsx";

type DesktopNavigationProps = {
  profile: PublicProfile | null;
};

export function DesktopNavigation({ profile }: DesktopNavigationProps) {
  return (
    <div className="items-center justify-between hidden w-full max-w-3xl mx-auto text-sm h-14 md:flex">
      <div className="flex items-center gap-4">
        {profile && <AvatarDropdownHandler profile={profile} />}
        <Link className="hover:text-white" href="/">
          Home
        </Link>
        <Link className="hover:text-white" href="/spaces">
          Spaces
        </Link>
        <NewPostDropdown />
      </div>
      <div>
        <SpacesSearch />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <AuthButtons profile={profile} />
      </div>
    </div>
  );
}
