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

  async function getCommunityName() {
    if (root_post) {
      const { data: community } = await supabase
        .from("community")
        .select()
        .eq("id", root_post.posted_in)
        .single();

      return community.name;
    }
  }

  async function getPostedByUsername() {
    if (root_post) {
      const { data: public_profile } = await supabase
        .from("public_profile")
        .select()
        .eq("id", root_post.created_by)
        .single();

      return public_profile.username;
    }
  }

  const communityName = await getCommunityName();
  const username = await getPostedByUsername();

  return (
    <div className="pb-2 text-sm border-b-2 border-neutral-700">
      {root_post.title} - {communityName} posted by {username}
    </div>
  );
}
