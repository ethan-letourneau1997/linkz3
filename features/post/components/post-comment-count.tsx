import { FaComments } from "react-icons/fa";
import { Post } from "@/types";
import { getPostCommentCount } from "@/helpers/post-helpers";

type PostCommentCountProps = {
  post: Post;
};

export async function PostCommentCount({ post }: PostCommentCountProps) {
  const commentCount = await getPostCommentCount(post.id);

  return (
    <div className="flex items-center gap-1">
      <FaComments />
      {commentCount} comments
    </div>
  );
}
