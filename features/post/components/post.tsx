import { ImagePostContent } from "./image-post-content";
import { LinkPostContent } from "./link-post-content";
import { PostCommentCount } from "./post-comment-count";
import { PostCommunity } from "./post-community";
import { PostFooter } from "./post-footer";
import { PostMetadata } from "./post-metadata";
import { PostOptions } from "./post-options";
import { Post, PostRouterParams } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { TextPostContent } from "./text-post-content";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense } from "react";

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

  if (post)
    return (
      <div className="w-full px-5 py-5 mt-5 space-y-3 dark:bg-neutral-900">
        <div className="flex justify-between">
          <PostMetadata post={post} />
          <Suspense fallback={<></>}>
            <PostOptionsHandler post={post} params={params} />
          </Suspense>
        </div>
        <PostCommunity post={post} />

        <h1 className="py-3 text-xl ">{post.title}</h1>

        {post.type === "text" && <TextPostContent post={post} />}

        {post.type === "link" && <LinkPostContent post={post} />}

        {post.type === "image" && <ImagePostContent post={post} />}

        <PostFooter params={params}>
          <PostVotes post={post} horizontal />
          <PostCommentCount post={post} />
        </PostFooter>
      </div>
    );

  if (!post) return <div>no post available</div>;
}

type PostOptionsHandlerProps = {
  post: Post;
  params: PostRouterParams;
};

async function PostOptionsHandler({ post, params }: PostOptionsHandlerProps) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();

  return (
    <>
      {data.session?.user.id && data.session?.user.id === post.created_by && (
        <PostOptions post={post} params={params} />
      )}
    </>
  );
}
