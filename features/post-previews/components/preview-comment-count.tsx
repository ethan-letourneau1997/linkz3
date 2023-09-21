import { Post, PostPreview } from "@/types";

import { GoComment } from "react-icons/go";
import { getPostCommentCount } from "@/lib/post-helpers";

type PreviewCommentCountProps = {
  post: Post | PostPreview;
};

export async function PreviewCommentCount({ post }: PreviewCommentCountProps) {
  const commentCount = await getPostCommentCount(post.id!);
  return (
    <>
      <GoComment />
      {commentCount} comments
    </>
  );
}
