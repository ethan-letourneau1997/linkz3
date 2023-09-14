import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function CommentAvatar() {
  return (
    <Avatar className="w-5 h-5 md:w-7 md:h-7 md:block">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
