import { ImagePostContent } from "./image-post-content";
import { LinkPostContent } from "./link-post-content";
import { PostCommentCount } from "./post-comment-count";
import { PostCommunity } from "./post-community";
import { PostFooter } from "./post-footer";
import { PostMetadata } from "./post-metadata";
import { PostRouterParams } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { TextPostContent } from "./text-post-content";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type PostProps = {
  params: PostRouterParams;
};

export async function Post({ params }: PostProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data: post } = await supabase
    .from("post")
    .select()
    .eq("id", params.postId)
    .single();

  return (
    <div className="w-full px-5 py-5 mt-5 space-y-3 dark:bg-neutral-900">
      <PostMetadata post={post} />
      <PostCommunity post={post} />
      <h1 className="py-3 text-xl font-semibold ">{post.title}</h1>
      {post.type === "text" && <TextPostContent post={post} />}

      {post.type === "link" && <LinkPostContent post={post} />}

      {post.type === "image" && <ImagePostContent post={post} />}

      <PostFooter params={params}>
        <PostVotes post={post} horizontal />
        <PostCommentCount post={post} />
      </PostFooter>
    </div>
  );
}
