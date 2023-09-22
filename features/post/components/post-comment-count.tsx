import { GoComment } from "react-icons/go";
import { Post } from "@/types";
import { fetchPostCommentCount } from "@/lib/post/fetch-post-comment-count";

type PostCommentCountProps = {
  post: Post;
};

export async function PostCommentCount({ post }: PostCommentCountProps) {
  const commentCount = await fetchPostCommentCount(post.id);

  return (
    <div className="flex items-center gap-1 text-sm md:text-base text-neutral-400">
      <GoComment />
      {commentCount} comments
    </div>
  );
}
