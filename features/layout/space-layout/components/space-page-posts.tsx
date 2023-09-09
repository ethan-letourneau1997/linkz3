import { PostPreviews } from "@/features/post-preview/components/post-previews";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type SpacePagePostsProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
  };
};

export async function SpacePagePosts({ params }: SpacePagePostsProps) {
  const supabase = createServerComponentClient({ cookies });

  const currentPage = parseInt(params.page, 10);
  const upperLimit = currentPage * 10;
  const lowerLimit = upperLimit - 10;

  console.log("lower" + lowerLimit);

  console.log("upper" + upperLimit);

  const { data: posts } = await supabase
    .from("post")
    .select()
    .eq("posted_in", params.spaceId)
    .range(lowerLimit, upperLimit);

  if (posts) return <PostPreviews posts={posts} />;

  if (!posts) return <div>No posts</div>;
}
