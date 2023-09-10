import { Comment } from "@/types";

type CommentProps = {
  comments: Comment[] | null;
};

export function Comments({ comments }: CommentProps) {
  return (
    <>
      {comments ? (
        <>
          {comments.map((comment) => (
            <div key={comment.id} className="py-10 bg-neutral-700">
              <div className="text-3xl font-bold">{comment.id}</div>
            </div>
          ))}
        </>
      ) : (
        <div>No posts available!</div>
      )}
    </>
  );
}
