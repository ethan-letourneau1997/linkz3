import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Title } from "@/components/typography";
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

  console.log(data);

  console.log(public_profile);
  return (
    <div className="max-w-lg ">
      <Title size="h4" as="h2" text="Profile" />
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
        <Textarea id="bio" defaultValue={public_profile.username} />
      </form>
    </div>
  );
}
