import { PostImageEditor } from "./post-image-editor";
import { PostRouterParams } from "@/types";
import { PostTextEditor } from "./post-text-editor";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchPostFromId } from "@/lib/post/fetch-post-from-id";
import { redirect } from "next/navigation";

type HandlePostEditorProps = {
  params: PostRouterParams;
};

export async function PostEditor({ params }: HandlePostEditorProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  const post = await fetchPostFromId(params.postId as string);

  // prevent post edit access form url
  if (
    !data.session?.user.id ||
    (data.session?.user.id && data.session?.user.id !== post.created_by)
  ) {
    redirect(
      `/spaces/${params.spaceId}/${params.spaceName}/post/${params.postId}`
    );
  }

  if (post.type === "text")
    return (
      <div className="w-full max-w-3xl mt-5">
        <PostTextEditor post={post} params={params} />
      </div>
    );

  if (post.type === "image") return <PostImageEditor params={params} />;
}
