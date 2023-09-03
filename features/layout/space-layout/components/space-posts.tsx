import { PostPreview } from "@/features/post-preview";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type SpacePostsProps = {
  spaceId: string;
};

export async function SpacePosts({ spaceId }: SpacePostsProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase
    .from("post")
    .select()
    .eq("posted_in", spaceId);

  return (
    <div className="w-full max-w-2xl my-5 border divide-y">
      {posts?.map((post) => <PostPreview key={post.id} post={post} />)}
    </div>
  );
}
