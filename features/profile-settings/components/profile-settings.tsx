import { AvatarUploadModal } from "./avatar-upload-modal";
import { BioInput } from "./bio-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "./user-avatar";
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

  console.log(public_profile);

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
        <BioInput user={public_profile} />
        <Label className="mt-7" htmlFor="bio">
          Avatar
        </Label>
        <div className="flex items-center gap-2">
          <UserAvatar user={public_profile} />
          <AvatarUploadModal user={public_profile} />
        </div>
      </form>
    </div>
  );
}
