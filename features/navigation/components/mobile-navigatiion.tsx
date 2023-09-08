"use client";

import LogoutButton from "@/components/LogoutButton";
import { GoogleLogin } from "@/components/google-login";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { PublicProfile } from "@/types";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type NavHeaderProps = {
  user: User | null;
  profile: PublicProfile;
};

export function MovileNavigation({ user, profile }: NavHeaderProps) {
  const [open, setOpen] = useState(true);

  return (
    <div className="block md:hidden">
      <div className="flex justify-between pt-4 pr-4">
        <div />
        <button onClick={() => setOpen(true)}>
          <GiHamburgerMenu className="text-2xl" />
        </button>
      </div>
      <Sheet key={"left"} open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              {profile && <div> Hello, {profile.username}!</div>}
            </SheetTitle>

            <div className="p-3 space-y-3 text-sm text-foreground dark:text-neutral-100">
              <Link className="block" href="/">
                Home
              </Link>
              <Link className="block" href="/spaces">
                Spaces
              </Link>
              {user && (
                <>
                  <Link className="block" href="/subscriptions">
                    Subscriptions
                  </Link>
                  <Link
                    className="block"
                    href={`/profile/${profile?.username}`}
                  >
                    My Profile
                  </Link>
                </>
              )}

              <div>
                {user ? (
                  <LogoutButton />
                ) : (
                  <>
                    <Link href="/login" className="block">
                      Login
                    </Link>
                    <GoogleLogin />
                  </>
                )}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
