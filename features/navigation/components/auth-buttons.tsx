import { Button } from "@/components/ui/button";
import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { PublicProfile } from "@/types";

type AuthButtonsProps = {
  profile: PublicProfile | null;
};

export function AuthButtons({ profile }: AuthButtonsProps) {
  return (
    <>
      {profile ? (
        <div className="flex items-center gap-4 font-bold">
          <LogoutButton />
        </div>
      ) : (
        <>
          <Button asChild>
            <Link
              href="/login"
              className="px-4 py-2 no-underline rounded-md bg-btn-background hover:bg-btn-background-hover"
            >
              Login
            </Link>
          </Button>
        </>
      )}
    </>
  );
}
