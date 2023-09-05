import { PostRouterParams } from "@/types";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getPostCommunityName, getPostPostedBy } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";
import { FaComments } from "react-icons/fa";
import { Post } from "@/types";
import { getPostCommentCount } from "@/helpers/post-helpers";
import { LinkPostContent } from "./link-post-content";
import { PostVotes } from "@/features/post-votes";
import { TextPostContent } from "./text-post-content";
import { ImagePostContent } from "./image-post-content";

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
    <div className="w-full max-w-2xl px-5 py-5 mt-5 space-y-3 dark:bg-neutral-900">
      <PostUser post={post} />
      <PostCommunity post={post} />
      <h1 className="py-3 text-xl font-semibold ">{post.title}</h1>
      {post.type === "text" && <TextPostContent post={post} />}

      {post.type === "link" && <LinkPostContent post={post} />}

      {post.type === "image" && <ImagePostContent post={post} />}
      <div className="flex gap-3 ">
        <PostVotes post={post} horizontal />
        <PostCommentCount post={post} />
      </div>
    </div>
  );
}

type PostUserProps = {
  post: Post;
};

export async function PostUser({ post }: PostUserProps) {
  const postedby = await getPostPostedBy(post.created_by);
  const timeSincePost = getTimeSinceNow(post.created_at, true);

  return (
    <div>
      posted by {postedby} - {timeSincePost}
    </div>
  );
}

type PostCommentCountProps = {
  post: Post;
};

export async function PostCommentCount({ post }: PostCommentCountProps) {
  const commentCount = await getPostCommentCount(post.id);

  return (
    <div className="flex items-center gap-1">
      <FaComments />
      {commentCount} comments
    </div>
  );
}

type PostCommunityProps = {
  post: Post;
};

export async function PostCommunity({ post }: PostCommunityProps) {
  const communityName = await getPostCommunityName(post.posted_in);
  return <div>{communityName}</div>;
}
