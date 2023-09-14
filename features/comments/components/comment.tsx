import { PostRouterParams } from "@/types";
import { Comment } from "@/types";
import { CommentVotes } from "@/features/comment-votes";
import { CommentFooter } from "./comment-footer";
import { CommentCollapse } from "./comment-collapse";
import { CommentOptionsMenu } from "./comment-options-dropdown";
import { CommentHeader } from "./comment-header";

type CommentProps = {
  comment: Comment;
  children: React.ReactNode;
  params: PostRouterParams;
};

export function Comment({ comment, children, params }: CommentProps) {
  return (
    <CommentCollapse header={<CommentHeader comment={comment} />}>
      <div className="w-full -mt-1.5 ">
        <div
          id="CommentContent"
          className="pl-2 pr-4 mt-2 text-sm prose dark:prose-invert dark:text-neutral-300 md:text-base"
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
  );
}
