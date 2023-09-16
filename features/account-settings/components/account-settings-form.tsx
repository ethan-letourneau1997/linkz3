import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function AccountSettingsForm() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // TODO change input type to email

  return (
    <div className="max-w-lg ">
      <h2 className="text-lg font-medium">Profile</h2>
      <Separator className="mt-4" />
      <form className="grid w-full max-w-sm items-center gap-1.5 mt-5">
        <Label htmlFor="email">Email</Label>
        <Input
          autoComplete="false"
          type="text"
          id="email"
          defaultValue={user?.email}
        />
      </form>
    </div>
  );
}
