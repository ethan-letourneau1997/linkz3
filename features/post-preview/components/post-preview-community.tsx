import Link from "next/link";
import { Post } from "@/types";
import { getPostCommunityName } from "@/helpers/post-helpers";

type PostPreviewCommunityProps = {
  post: Post;
};

export async function PostPreviewCommunity({
  post,
}: PostPreviewCommunityProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return <Link href="#">{communityName}</Link>;
}
