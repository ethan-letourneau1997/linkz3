import { CommentPreview } from "@/features/comment-preview";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type ProfilePostsProps = {
  username: string;
};

export async function ProfileComments({ username }: ProfilePostsProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("username", username)
    .single();

  const { data: comments } = await supabase
    .from("comment")
    .select()
    .eq("posted_by", public_profile.id);

  return (
    <div>
      <h1>Comments</h1>
      <div className="w-full max-w-3xl my-5 space-y-5">
        {comments?.map((comment) => (
          <CommentPreview
            key={comment.id}
            comment={comment}
            username={username}
          />
        ))}
      </div>
    </div>
  );
}
