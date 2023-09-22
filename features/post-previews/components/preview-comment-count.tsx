import { Post, PostPreview } from "@/types";

import { GoComment } from "react-icons/go";
import { fetchPostCommentCount } from "@/lib/post/fetch-post-comment-count";

type PreviewCommentCountProps = {
  post: Post | PostPreview;
};

export async function PreviewCommentCount({ post }: PreviewCommentCountProps) {
  const commentCount = await fetchPostCommentCount(post.id!);
  return (
    <>
      <GoComment />
      {commentCount} comments
    </>
  );
}
