import { LinkPreview, Post } from "@/types";
import { getPostCommunityName, getPostPostedBy } from "@/helpers/post-helpers";

import { GoComment } from "react-icons/go";
import { HiOutlineLink } from "react-icons/hi";
import Link from "next/link";
import { PostPreviewThumbnail } from "./post-preview-thumbnail";
import { PostVotes } from "@/features/post-votes";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getLinkPreview } from "link-preview-js";
import { getPostCommentCount } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostPreviewProps = {
  post: Post;
};

export async function PostPreview({ post }: PostPreviewProps) {
  const timeSincePost = getTimeSinceNow(post.created_at, true);
  const communityName = await getPostCommunityName(post.posted_in);
  const commentCount = await getPostCommentCount(post.id);
  const postedBy = await getPostPostedBy(post.created_by);

  return (
    <>
      <div className="hidden grid-cols-12 gap-3 px-4 py-3 mt-2 border rounded-md sm:grid dark:border-neutral-800 dark:bg-neutral-900">
        <div className="col-span-2 aspect-[4/3]">
          {post.type === "link" ? (
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <LinkThumbnail post={post} />
            </Suspense>
          ) : (
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <PostPreviewThumbnail post={post} />
            </Suspense>
          )}
        </div>
        <div className="flex flex-col justify-between col-span-10">
          <div>
            <div className="text-sm ">
              <Link className="font-semibold dark:text-neutral-200" href="#">
                {communityName}
              </Link>
              <span className="dark:text-neutral-400">
                &nbsp;posted by&nbsp;
                <Link href={`/profile/${postedBy}`}>{postedBy}</Link>
                &nbsp;-&nbsp;{timeSincePost}
              </span>
            </div>
            <div className="mt-1 font-bold ">{post.title}</div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm text-neutral-400">
            <div className="w-fit">
              <PostVotes post={post} horizontal />
            </div>
            <div className="flex items-center gap-2">
              <GoComment />
              {commentCount} comments
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Display */}

      <div className="grid grid-cols-12 gap-2 px-2 pt-3 pb-1 border-t sm:hidden dark:border-neutral-800 ">
        <div className="col-span-9 ">
          <div className="text-xs ">
            <Link className="dark:text-neutral-200" href="#">
              {communityName}
            </Link>
            <span className="dark:text-neutral-400">
              &nbsp;posted by&nbsp;
              <Link href={`/profile/${postedBy}`}>{postedBy}</Link>
              &nbsp;-&nbsp;{timeSincePost}
            </span>
          </div>

          <div className="mt-1 text-sm font-bold sm:text-base">
            {post.title}
          </div>
        </div>
        <div className="col-span-3 aspect-[4/3]  ">
          {post.type === "link" ? (
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <LinkThumbnail post={post} />
            </Suspense>
          ) : (
            <Suspense fallback={<Skeleton className="w-full h-full" />}>
              <PostPreviewThumbnail post={post} />
            </Suspense>
          )}
        </div>
        <div className="flex items-center col-span-12 gap-2 mt-2 text-sm text-neutral-400 ">
          <div className="w-fit">
            <PostVotes post={post} horizontal />
          </div>
          <div className="flex items-center gap-2">
            <GoComment />
            {commentCount} comments
          </div>
        </div>
      </div>
    </>
  );
}

type LinkThumbnailProps = {
  post: Post;
};

async function LinkThumbnail({ post }: LinkThumbnailProps) {
  if (!post.content) return <></>;

  const link: LinkPreview = await getLinkPreview(post.content);

  const previewLink = link.images && link.images[0];

  return (
    <>
      {previewLink ? (
        <div
          className="flex items-end w-full h-full rounded "
          style={{
            backgroundImage: `url(${link.images && link.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
            {link.siteName}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      )}
    </>
  );
}
