import { AuthButtons } from "./auth-buttons";
import Link from "next/link";
import { PublicProfile } from "@/types";
import { UserSpacesHandler } from "./user-spaces-handler";

type DesktopNavigationProps = {
  profile: PublicProfile | null;
};

export function DesktopNavigation({ profile }: DesktopNavigationProps) {
  return (
    <div className="items-center justify-between hidden w-full max-w-3xl mx-auto text-sm h-14 md:flex">
      <div className="flex items-center gap-3">
        {profile && <UserSpacesHandler profile={profile} />}
        <Link href="/">Home</Link>
        <Link href="/spaces">Spaces</Link>
      </div>
      <div>
        <AuthButtons profile={profile} />
      </div>
    </div>
  );
}
