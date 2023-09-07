import { HandlePostEditor } from "./handle-post-editor";
import { PostRouterParams } from "@/types";
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
  return (
    <div className="w-full max-w-3xl mt-5">
      <HandlePostEditor post={post} params={params} />
    </div>
  );
}
