import { PostImageEditor } from "./post-image-editor";
import { PostRouterParams } from "@/types";
import { PostTextEditor } from "./post-text-editor";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type HandlePostEditorProps = {
  params: PostRouterParams;
};

export async function PostEditor({ params }: HandlePostEditorProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: post } = await supabase
    .from("post")
    .select()
    .eq("id", params.postId)
    .single();
  if (post.type === "text")
    return (
      <div className="w-full max-w-3xl mt-5">
        <PostTextEditor post={post} params={params} />
      </div>
    );

  if (post.type === "image") return <PostImageEditor params={params} />;
}
