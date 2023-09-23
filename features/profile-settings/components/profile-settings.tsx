import { BioInput } from "./bio-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileAvatar } from "./profile-avatar";
import { Separator } from "@/components/ui/separator";
import { fetchLoggedInProfile } from "@/lib/user/fetch-logged-in-profile";

export async function ProfileSettings() {
  const profile = await fetchLoggedInProfile();
  if (profile)
    return (
      <div className="max-w-lg ">
        <h2 className="text-xl font-semibold ">Profile</h2>
        <Separator className="mt-4" />

        <div className="mt-3">
          <Label htmlFor="avatar">Avatar</Label>
          <ProfileAvatar user={profile} />

          <div className="relative -top-3">
            <Label htmlFor="username">Username</Label>
            <Input
              className="w-5/6 mt-1 dark:bg-dark-800"
              disabled
              type="text"
              id="username"
              defaultValue={profile.username}
            />
            <BioInput user={profile} />
          </div>
        </div>
      </div>
    );
}
