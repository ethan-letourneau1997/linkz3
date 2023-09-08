import { PostPreviews } from "@/features/post-preview/components/post-previews";
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

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
