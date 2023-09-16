import { ImagePostContent } from "./image-post-content";
import Link from "next/link";
import { LinkPostContent } from "./link-post-content";
import { PostCommentCount } from "./post-comment-count";
import { PostCommunity } from "./post-community";
import { PostFooter } from "./post-footer";
import { PostMetadata } from "./post-metadata";
import { PostOptions } from "@/features/post-options";
import { PostRouterParams } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { Suspense } from "react";
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

  

  if (post)
    return (
      <div className="px-2 dark:text-neutral-300 md:px-0 ">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex text-xs text-neutral-400 ">
              <PostCommunity post={post} />
              &nbsp;-&nbsp;
              <PostMetadata post={post} />
            </div>

            <Suspense fallback={<></>}>
              <PostOptions post={post}/>
              {/* <PostOptions post={post} params={params} /> */}
            </Suspense>
          </div>

          <h1 className="mb-3 text-lg font-semibold tracking-tight">
            {post.title}
          </h1>
        </div>

        <div className="pb-2">
          {post.type === "text" && <TextPostContent post={post} />}
          {post.type === "link" && <LinkPostContent post={post} />}
          {post.type === "image" && <ImagePostContent post={post} />}
        </div>

        <PostFooter params={params}>
          <PostVotes post={post} horizontal />
          <PostCommentCount post={post} />
        </PostFooter>
      </div>
    );

  if (!post)
    return (
      <div>
        Post does not exist or has been deleted. Return to{" "}
        <Link href={`/spaces/${params.spaceId}/${params.spaceName}`}>
          {params.spaceName}
        </Link>
      </div>
    );
}
