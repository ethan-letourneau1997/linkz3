import { PostRouterParams } from "@/types";
import { Comment } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";
import { CommentVotes } from "@/features/comment-votes";
import { CommentReplyInput } from "./comment-reply-input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type CommentProps = {
  comment: Comment;
  children: React.ReactNode;
  params: PostRouterParams;
};

export function Comment({ comment, children, params }: CommentProps) {
  return (
    <Card className="border-none">
      <CardHeader className="pb-3">
        <CardDescription className="text-sm">
          <CommentUser comment={comment} />
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: comment.content || "" }}
        />
      </CardContent>

      <CardFooter>
        <div>
          <CommentVotes horizontal comment={comment} />
        </div>
        <div>
          <CommentReplyInput comment={comment} params={params} />
        </div>
      </CardFooter>
      {children}
    </Card>
  );
}

type CommentUserProps = {
  comment: Comment;
};
export async function CommentUser({ comment }: CommentUserProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", comment.posted_by)
    .single();

  return (
    <>
      {public_profile.username} - {getTimeSinceNow(comment.created_at, true)}
    </>
  );
}
