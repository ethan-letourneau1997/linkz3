import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function ProfileSettings() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", data.session?.user.id)
    .single();

  return (
    <div className="max-w-lg ">
      <h2 className="text-xl font-semibold ">Profile</h2>
      <Separator className="mt-4" />
      <form className="grid w-full max-w-sm items-center gap-1.5 mt-7">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          defaultValue={public_profile.username}
        />
        <Label className="mt-7" htmlFor="bio">
          Bio
        </Label>
        <Textarea id="bio" defaultValue={public_profile.biography} />
      </form>
    </div>
  );
}
