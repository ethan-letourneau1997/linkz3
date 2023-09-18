import { FaUserAlt } from "react-icons/fa";
import { PublicProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  user: PublicProfile;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div>
      {user.avatar ? (
        <Avatar>
          <AvatarImage src={user.avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <div className="p-3 rounded-full dark:bg-neutral-700 w-fit">
          <FaUserAlt />
        </div>
      )}
    </div>
  );
}
