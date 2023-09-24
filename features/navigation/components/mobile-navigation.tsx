import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BsFillRocketFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { FaUserAstronaut } from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import { IoSettingsSharp } from "react-icons/io5";
import Link from "next/link";
import { MobileSidebar } from "./mobile-sidebar";
import { MobileUserSpacesHandler } from "./mobile-user-spaces-handler";
import { PublicProfile } from "@/types";

type DesktopNavigationProps = {
  profile: PublicProfile | null;
};

export function MobileNavigation({ profile }: DesktopNavigationProps) {
  return (
    <>
      <MobileSidebar
        header={
          <div className="flex justify-center gap-3 ">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {profile?.username}
          </div>
        }
      >
        <>
          <div className="flex flex-col justify-between gap-3 px-2 mt-5">
            <Link href="/">Home</Link>
            <Link href="/spaces">Spaces</Link>
            {profile && (
              <>
                <div className="flex items-center gap-1">
                  <FaUserAstronaut className="w-4 h-4 mr-2 " />
                  <Link href={`/profile/${profile?.username}/new/1`}>
                    Profile
                  </Link>
                </div>
                <div className="flex items-center gap-1">
                  <BsFillRocketFill className="w-4 h-4 mr-2 " />
                  <Link href={`/subscriptions/feed/new/1`}>Feed</Link>
                </div>
                <div className="flex items-center gap-1">
                  <GiGalaxy className="w-4 h-4 mr-2 " />
                  <Link href={"/subscriptions"}>Subscriptions</Link>
                </div>
                <div className="flex items-center gap-1">
                  <IoSettingsSharp className="w-4 h-4 mr-2" />
                  <Link href={"/settings/profile"}>Settings</Link>
                </div>

                {/* <MobileUserSpacesHandler profile={profile} /> */}
              </>
            )}
          </div>
          <div className="mt-7">
            {profile ? (
              <form action="/auth/sign-out" method="post">
                <Button variant="outline" className="w-full">
                  Logout
                </Button>
              </form>
            ) : (
              <>
                <Button asChild>
                  <Link href="/login">Login</Link>
                </Button>
                {/* <GoogleLogin /> */}
              </>
            )}
          </div>
        </>
      </MobileSidebar>
    </>
  );
}
