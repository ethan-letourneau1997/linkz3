import { PostPreview } from "@/features/post-preview";
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

  return (
    <div>
      <h1>Posts</h1>
      <div className="w-full max-w-3xl my-5 border divide-y dark:border-neutral-500">
        {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
      </div>
    </div>
  );
}
