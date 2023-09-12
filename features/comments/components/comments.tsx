import { Card } from "@/components/ui/card";
import { Comment } from "./comment";
import { Comment as CommentType } from "@/types";
import { PostRouterParams } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type CommentsProps = {
  params: PostRouterParams;
};

export async function Comments({ params }: CommentsProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: comments } = await supabase
    .from("comment_details")
    .select()
    .eq("root_post", params.postId)
    .order("created_at", { ascending: false });

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
      <Card className="py-5 pl-5 mt-5 mb-8 space-y-3">
        {rootComments?.map((rootComment) => (
          <Comment key={rootComment.id} comment={rootComment} params={params}>
            <ChildComments
              commentId={rootComment.id}
              allComments={comments}
              params={params}
            />
          </Comment>
        ))}
      </Card>
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
        <div className="pl-2 " key={childComment.id}>
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
