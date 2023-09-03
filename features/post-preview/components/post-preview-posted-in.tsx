import { Post } from "@/types";
import { getPostCommunityName } from "@/helpers/post-helpers";

type PostPreviewPostedInProps = {
  post: Post;
};

export async function PostPreviewPostedIn({ post }: PostPreviewPostedInProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return <div>{communityName}</div>;
}
