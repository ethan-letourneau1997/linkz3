import { Comment } from "./comment";
import { Comment as CommentType } from "@/types";
import { FaComments } from "react-icons/fa";
import { PostRouterParams } from "@/types";
import { fetchPostComments } from "../api/fetch-post-comments";

type CommentsProps = {
  params: PostRouterParams;
};

export async function Comments({ params }: CommentsProps) {
  const comments = await fetchPostComments(params.postId);

  async function filterComments() {
    if (comments) {
      const rootComments = comments.filter(
        (comment) => comment.parent_comment === null
      );

      return rootComments;
    }
  }

  const rootComments = await filterComments();

  if (comments && comments.length > 0)
    return (
      <div className="">
        {rootComments?.map((rootComment) => (
          <Comment key={rootComment.id} comment={rootComment} params={params}>
            <ChildComments
              commentId={rootComment.id}
              allComments={comments}
              params={params}
            />
          </Comment>
        ))}
      </div>
    );

  if (comments && comments.length === 0)
    return (
      <div className="min-h-[20vh] flex justify-center items-center">
        <div className="flex items-center gap-2 dark:text-neutral-500">
          <FaComments size={20} />
          <span>No comments yet</span>
        </div>
      </div>
    );
}

async function ChildComments({
  commentId,
  allComments,
  params,
}: {
  commentId: number;
  allComments: CommentType[] | null;
  params: PostRouterParams;
}) {
  const childComments = allComments?.filter(
    (c) => c.parent_comment === commentId
  );

  return (
    <div>
      {childComments?.map((childComment) => (
        <div className="pl-1 " key={childComment.id}>
          <Comment comment={childComment} params={params}>
            <ChildComments
              commentId={childComment.id}
              allComments={allComments}
              params={params}
            />
          </Comment>
        </div>
      ))}
    </div>
  );
}
