import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaUserAlt } from "react-icons/fa";
import { ProfileAvatarModal } from "./profile-avatar-modal";
import { PublicProfile } from "@/types";
import { fetchProfileAvatar } from "@/lib/user/fetch-profile-avatar";

type UserAvatarProps = {
  user: PublicProfile;
};

export async function ProfileAvatar({ user }: UserAvatarProps) {
  const profileAvatar = await fetchProfileAvatar(user.id);
  return (
    <div className="mt-1">
      {profileAvatar ? (
        <Avatar className="w-20 h-20 rounded-sm ">
          <AvatarImage src={profileAvatar.path} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <div className="p-3 rounded-sm dark:bg-neutral-700 w-fit">
          <FaUserAlt />
        </div>
      )}
      <ProfileAvatarModal userId={user.id} profileAvatar={profileAvatar} />
    </div>
  );
}
