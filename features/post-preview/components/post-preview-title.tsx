import Link from "next/link";
import { Post } from "@/types";
import { getPreviewCommunityName } from "../api/get-preview-community-name";

type PostPreviewTitleProps = {
  post: Post;
  communityName?: string;
};

export async function PostPreviewTitle({
  post,
  communityName,
}: PostPreviewTitleProps) {
  async function getCommunityName() {
    if (communityName !== null && communityName !== undefined) {
      return communityName;
    }
    const name = await getPreviewCommunityName(post.posted_in!);
    return name;
  }

  const spaceName = await getCommunityName();

  return (
    <Link
      className="block hover:underline"
      href={`/spaces/${post.posted_in}/${spaceName}/post/${post.id}`}
    >
      {post.title}
    </Link>
  );
}
