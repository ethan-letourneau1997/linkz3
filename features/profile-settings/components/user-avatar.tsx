import { FaUserAlt } from "react-icons/fa";
import { PublicProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  user: PublicProfile;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <div className="mt-1">
      {user.avatar ? (
        <Avatar className="w-20 h-20 rounded-sm ">
          <AvatarImage src={user.avatar} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <div className="p-3 rounded-sm dark:bg-neutral-700 w-fit">
          <FaUserAlt />
        </div>
      )}
    </div>
  );
}
