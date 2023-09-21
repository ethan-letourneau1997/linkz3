import { CommentPreview } from "@/features/comment-preview";
import { getSortedProfileComments } from "../api/get-sorted-profile-comments";

type ProfilePostsProps = {
  params: {
    username: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function ProfileComments({ params }: ProfilePostsProps) {
  const comments = await getSortedProfileComments(
    params.sort,
    params.username,
    params.page
  );

  if (comments && comments.length > 0)
    return (
      <div className="w-full max-w-3xl my-5 space-y-5">
        {comments?.map((comment) => (
          <CommentPreview
            key={comment.id}
            comment={comment}
            username={params.username}
          />
        ))}
      </div>
    );

  if (comments && comments.length === 0)
    return (
      <div className="mt-10 text-center text-neutral-300">
        {params.username} has not made any comments.
      </div>
    );
}
