import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { ImagePostContent } from "./image-post-content";
import Link from "next/link";
import { LinkPostContent } from "./link-post-content";
import { PostCommentCount } from "./post-comment-count";
import { PostCommunity } from "./post-community";
import { PostFooter } from "./post-footer";
import { PostMetadata } from "./post-metadata";
import { PostOptionsMenu } from "./post-options-menu";
import { PostRouterParams } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { Suspense } from "react";
import { TextPostContent } from "./text-post-content";
import { Title } from "../../../components/typography";
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
      <Card className="dark:bg-transparent border-0 dark:text-neutral-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription className="flex text-sm ">
              <PostCommunity post={post} />
              &nbsp;-&nbsp;
              <PostMetadata post={post} />
            </CardDescription>

            <Suspense fallback={<></>}>
              <PostOptionsMenu post={post} params={params} />
              {/* <PostOptions post={post} params={params} /> */}
            </Suspense>
          </div>

          <Title size="h4" as="h1" text={post.title} />
        </CardHeader>

        <CardContent className="pb-2">
          {post.type === "text" && <TextPostContent post={post} />}
          {post.type === "link" && <LinkPostContent post={post} />}
          {post.type === "image" && <ImagePostContent post={post} />}
        </CardContent>

        <CardFooter>
          <PostFooter params={params}>
            <PostVotes post={post} horizontal />
            <PostCommentCount post={post} />
          </PostFooter>
        </CardFooter>
      </Card>
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
