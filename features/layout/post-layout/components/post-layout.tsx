import { PostRouterParams } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function PostLayout({ params }: PostLayoutProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post } = await supabase
    .from("post")
    .select()
    .eq("id", params.postId)
    .single();

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
}
