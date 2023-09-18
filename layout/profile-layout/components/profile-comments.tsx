import { CommentPreview } from "@/features/comment-preview";
import { getSortedProfileComments } from "../api/get-sorted-profile-comments";

type ProfilePostsProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
  params: {
    username: string;
  };
};

export async function ProfileComments({
  params,
  searchParams,
}: ProfilePostsProps) {
  const comments = await getSortedProfileComments(
    searchParams.sort,
    params.username,
    searchParams.page
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
