import Link from "next/link";
import { Post } from "@/types";
import { fetchSpaceById } from "@/lib/space/fetch-space-by-id";

type PostCommunityProps = {
  post: Post;
};

export async function PostCommunity({ post }: PostCommunityProps) {
  const space = await fetchSpaceById(post.posted_in);

  return (
    <Link
      className="hover:underline hover:cursor-pointer "
      href={`/spaces/${post.posted_in}/${space.name}`}
    >
      {space.name}
    </Link>
  );
}
