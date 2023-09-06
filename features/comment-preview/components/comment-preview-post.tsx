import { Comment } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type CommentPreviewPostProps = {
  comment: Comment;
};

export async function CommentPreviewPost({ comment }: CommentPreviewPostProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: root_post } = await supabase
    .from("post")
    .select()
    .eq("id", comment.root_post)
    .single();

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("id", root_post.created_by)
    .single();

  const { data: community } = await supabase
    .from("community")
    .select()
    .eq("id", root_post.posted_in)
    .single();

  return (
    <div className="text-sm">
      {root_post.title} - {community.name} posted by {public_profile.username}
    </div>
  );
}
