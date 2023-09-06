import { GoogleLogin } from "@/components/google-login";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
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
    <nav className="flex justify-center w-full h-16 border-b border-b-neutral-400">
      <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm text-foreground">
        <div className="space-x-3">
          <Link href="/">Home</Link>
          <Link href="/spaces">Spaces</Link>
          <Link href="/subscriptions">Subscriptions</Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              Hello, {public_profile.username}!
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
