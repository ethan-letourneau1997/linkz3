import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GoogleLogin } from "@/components/google-login";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { ProfileLink } from "@/components/links/profile-link";
import { PublicProfile } from "@/types";
import { UserSpacesHandler } from "./user-spaces-handler";

type DesktopNavigationProps = {
  profile: PublicProfile | null;
};

export function DesktopNavigation({ profile }: DesktopNavigationProps) {
  return (
    // <NavMenu />
    <nav className="items-center hidden w-full max-w-3xl text-sm h-14 md:flex">
      {profile && <UserSpacesHandler profile={profile} />}

      <div className="flex items-center gap-3">
        <Link href="/">Home</Link>
        <Link href="/spaces">Spaces</Link>
      </div>
      <div>
        <LogButtons profile={profile} />
      </div>
    </nav>
  );
}

type LoginButtonsProps = {
  profile: PublicProfile | null;
};

export function LogButtons({ profile }: LoginButtonsProps) {
  return (
    <>
      {profile ? (
        <div className="flex items-center gap-4 font-bold">
          <LogoutButton />
        </div>
      ) : (
        <>
          <Link
            href="/login"
            className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
          >
            Login
          </Link>
          <GoogleLogin />
        </>
      )}
    </>
  );
}

type UserAvatarProps = {
  profile: PublicProfile;
};

export function UserAvatar({ profile }: UserAvatarProps) {
  return (
    <>
      <Avatar className="w-7 h-7">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <ProfileLink username={profile.username} text={profile.username} />
    </>
  );
}
