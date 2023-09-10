"use client";

import { GoogleLogin } from "@/components/google-login";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { PublicProfile } from "@/types";
import { SpacesDropdown } from "./spaces-dropdown";
import { User } from "@supabase/auth-helpers-nextjs";

type DesktopNavigationProps = {
  user: User | null;
  profile: PublicProfile;
};

export function DesktopNavigation({ user, profile }: DesktopNavigationProps) {
  return (
    <nav className="justify-center hidden h-16 md:flex ">
      <div className="flex items-center justify-between w-full max-w-3xl p-3 text-sm text-foreground">
        <div className="flex items-center gap-3">
          <Link href="/">Home</Link>
          <Link href="/spaces">Spaces</Link>

          {user && (
            <>
              <Link href="/subscriptions/new/1">Subscriptions</Link>
              <Link href={`/profile/${profile?.username}/post/new/1`}>
                My Profile
              </Link>
            </>
          )}
          {user && <SpacesDropdown userId={profile.id} />}
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4 font-bold">
              Hello, {profile.username}!
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
        </div>
      </div>
    </nav>
  );
}
