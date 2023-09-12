import { PostRouterParams } from "@/types";
import { Comment } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";
import { CommentVotes } from "@/features/comment-votes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CommentFooter } from "./comment-footer";

import { CommentCollapse } from "./comment-collapse";

type CommentProps = {
  comment: Comment;
  children: React.ReactNode;
  params: PostRouterParams;
};

export function Comment({ comment, children, params }: CommentProps) {
  return (
    <>
      <CommentCollapse header={<CommentHeader comment={comment} />}>
        <div className="w-full">
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: comment.content || "" }}
          />

          <CommentFooter comment={comment} params={params}>
            <CommentVotes horizontal comment={comment} />
          </CommentFooter>

          {children}
        </div>
      </CommentCollapse>

      {/* <Card
      // className="border-l border-r-0 rounded-none border-y-0 dark:border-l-neutral-800"
      >
        <CardHeader className="pt-0 pb-3">
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
          <CommentFooter comment={comment} params={params}>
            <CommentVotes horizontal comment={comment} />
          </CommentFooter>
        </CardFooter>
        {children}
      </Card> */}
    </>
  );
}

function UserAvatar() {
  return (
    <Avatar className="w-7 h-7">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

type CommentUserProps = {
  comment: Comment;
};
export async function CommentHeader({ comment }: CommentUserProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", comment.posted_by)
    .single();

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <UserAvatar />
        <span>
          {public_profile.username} -{" "}
          {getTimeSinceNow(comment.created_at, true)}
        </span>
      </div>
    </>
  );
}
