import Link from "next/link";
import { Post } from "@/types";
import { getPostCommunityName } from "@/lib/post-helpers";

type PostCommunityProps = {
  post: Post;
};

export async function PostCommunity({ post }: PostCommunityProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return (
    <Link
      className="hover:underline hover:cursor-pointer "
      href={`/spaces/${post.posted_in}/${communityName}`}
    >
      {communityName}
    </Link>
  );
}
