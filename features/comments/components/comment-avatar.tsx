import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Image from "next/image";
import { PublicProfile } from "@/types";
import { fetchProfileAvatar } from "@/lib/user/fetch-profile-avatar";

type CommentAvatarProps = {
  user: PublicProfile;
};

export async function CommentAvatar({ user }: CommentAvatarProps) {
  const userAvatar = await fetchProfileAvatar(user.id);
  return (
    <Avatar className="w-5 h-5 md:w-7 md:h-7 md:block">
      <AvatarImage
        asChild
        src={userAvatar ? userAvatar.path : "https://github.com/shadcn.png"}
      >
        <Image
          src={userAvatar ? userAvatar.path : "https://github.com/shadcn.png"}
          alt="logo"
          width={40}
          height={40}
        />
      </AvatarImage>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
