import { FaComments } from "react-icons/fa";
import { Post } from "@/types";
import { getPostCommentCount } from "@/helpers/post-helpers";

type PostPreviewCommentCountProps = {
  post: Post;
};

export async function PostPreviewCommentCount({
  post,
}: PostPreviewCommentCountProps) {
  const commentCount = await getPostCommentCount(post.id);

  return (
    <div className="flex items-center gap-1">
      <FaComments />
      {commentCount} comments
    </div>
  );
}
