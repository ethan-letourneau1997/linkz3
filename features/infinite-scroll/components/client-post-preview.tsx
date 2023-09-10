"use client";

import { Suspense, useEffect, useState } from "react";

import { GoComment } from "react-icons/go";
import { PostPreview } from "@/types";
import { PostLink } from "@/components/links/post-link";
import { ProfileLink } from "@/components/links/profile-link";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceLink } from "@/components/links/space-link";

import { getTimeSinceNow } from "@/lib/get-time-since-now";
import {
  ImagePreviewThumbnail,
  LinkPreviewThumbnail,
  TextPreviewThumnail,
} from "./preview-thumbnail";
import { getPostCommentCount } from "../api/get-post-comment-count";

type PostPreviewProps = {
  post: PostPreview;
};

export function PostPreview({ post }: PostPreviewProps) {
  return (
    <div className="grid grid-cols-12 gap-3 px-2 py-3 mt-2 border-t rounded-md sm:px-4 sm:border dark:border-neutral-800 sm:dark:bg-neutral-900">
      <div className="order-2 sm:order-1 col-span-3 sm:col-span-2 aspect-[4/3]">
        {post.type === "image" && <ImagePreviewThumbnail post={post} />}
        {post.type === "link" && <LinkPreviewThumbnail post={post} />}
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          {post.type === "text" && <TextPreviewThumnail />}
        </Suspense>
      </div>
      <div className="flex flex-col justify-between order-1 col-span-9 sm:order-2">
        <div>
          <div className="text-xs sm:text-sm ">
            <SpaceLink
              className="font-semibold dark:text-neutral-200"
              spaceName={post.community_name!}
              spaceId={post.posted_in!}
              text={post.community_name}
            />

            <span className="dark:text-neutral-400">
              &nbsp;posted by&nbsp;
              <ProfileLink username={post.username!} text={post.username} />
              &nbsp;-&nbsp;{getTimeSinceNow(post.created_at, true)}
            </span>
          </div>

          <PostLink
            text={post.title}
            className="mt-1 text-sm font-bold sm:text-base"
            spaceId={post.posted_in}
            spaceName={post.community_name!}
            postId={post.id!}
          />
        </div>

        <div className="items-center hidden gap-2 mt-2 text-sm sm:flex text-neutral-400">
          <PostCommentCount post={post} />
        </div>
      </div>
      {/* <div className="order-3 hidden col-span-1 sm:block ">
        <div className="flex justify-end h-full ">
          <PostVotes post={post} />
        </div>
      </div> */}
      {/* <div className="flex items-center order-4 col-span-12 gap-2 mt-2 text-sm sm:hidden text-neutral-400 ">
        <div className="w-fit sm:hidden">
          <PostVotes post={post} horizontal />
        </div>
        <div className="flex items-center gap-2">
          <GoComment />
          {commentCount} comments
        </div>
      </div> */}
    </div>
  );
}

type PostCommentCountProps = {
  post: PostPreview;
};

export function PostCommentCount({ post }: PostCommentCountProps) {
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function getCommentCount() {
      if (post.id) {
        const count = await getPostCommentCount(post.id);
        if (count) {
          setCommentCount(count);
        }
      }
    }

    getCommentCount();
  }, [post.id]);

  return (
    <>
      <GoComment />
      {commentCount} comments
    </>
  );
}
