import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PublicProfile } from "@/types";
import Image from "next/image";

type CommentAvatarProps = {
  user: PublicProfile;
};

export function CommentAvatar({ user }: CommentAvatarProps) {
  return (
    <Avatar className="w-5 h-5 md:w-7 md:h-7 md:block">
      <AvatarImage
        asChild
        src={user.avatar ? user.avatar : "https://github.com/shadcn.png"}
      >
        <Image
          src={user.avatar ? user.avatar : "https://github.com/shadcn.png"}
          alt="logo"
          width={40}
          height={40}
        />
      </AvatarImage>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
