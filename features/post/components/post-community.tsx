import { Post } from "@/types";
import { getPostCommunityName } from "@/helpers/post-helpers";

type PostCommunityProps = {
  post: Post;
};

export async function PostCommunity({ post }: PostCommunityProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return <div>{communityName}</div>;
}
