import { PostRouterParams } from "@/types";
import { Comment } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getTimeSinceNow } from "../../../lib/get-time-since-now";
import { CommentVotes } from "@/features/comment-votes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CommentFooter } from "./comment-footer";

import { CommentCollapse } from "./comment-collapse";
import { CommentOptionsMenu } from "./comment-options-dropdown";

type CommentProps = {
  comment: Comment;
  children: React.ReactNode;
  params: PostRouterParams;
};

export function Comment({ comment, children, params }: CommentProps) {
  return (
    <>
      <CommentCollapse header={<CommentHeader comment={comment} />}>
        <div className="w-full -mt-1.5 ">
          <div
            id="CommentContent"
            className="pr-4 text-sm prose dark:prose-invert dark:text-neutral-300 md:text-base"
            dangerouslySetInnerHTML={{ __html: comment.content || "" }}
          />

          <CommentFooter
            options={<CommentOptionsMenu comment={comment} params={params} />}
            comment={comment}
            params={params}
          >
            <CommentVotes horizontal comment={comment} />
          </CommentFooter>

          {children}
        </div>
      </CommentCollapse>
    </>
  );
}

function UserAvatar() {
  return (
    <Avatar className="w-5 h-5 md:w-7 md:h-7">
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
      <div className="flex items-center gap-2 text-xs md:text-sm text-neutral-400">
        <UserAvatar />
        <span>
          {public_profile.username} -{" "}
          {getTimeSinceNow(comment.created_at, true)}
        </span>
      </div>
    </>
  );
}
