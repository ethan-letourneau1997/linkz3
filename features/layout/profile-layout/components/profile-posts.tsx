import { PostPreviews } from "@/features/post-preview/components/post-previews";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type ProfilePostsProps = {
  username: string;
};

export async function ProfilePosts({ username }: ProfilePostsProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: public_profile } = await supabase
    .from("public_profile")
    .select()
    .eq("username", username)
    .single();

  const { data: posts } = await supabase
    .from("post")
    .select()
    .eq("created_by", public_profile.id);

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
