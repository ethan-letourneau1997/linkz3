import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { Post } from "@/types";
import { getPostCommunityName } from "@/helpers/post-helpers";

type PostPreviewPostedInProps = {
  post: Post;
};

export async function PostPreviewPostedIn({ post }: PostPreviewPostedInProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-6 h-6">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Link href="" className="text-xs ">
        {communityName}
      </Link>
    </div>
  );
}
