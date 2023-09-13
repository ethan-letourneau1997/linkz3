import { CommentPreview } from "@/features/comment-preview";
import { getSortedProfileComments } from "../api/get-sorted-profile-comments";

type ProfilePostsProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
    username: string;
    type: "post" | "comment";
  };
};

export async function ProfileComments({ params }: ProfilePostsProps) {
  const comments = await getSortedProfileComments(
    params.sortBy,
    params.username,
    params.page
  );

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
}
