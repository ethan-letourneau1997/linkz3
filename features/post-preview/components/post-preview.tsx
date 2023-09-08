import { getPostCommunityName, getPostPostedBy } from "@/helpers/post-helpers";

import { GoComment } from "react-icons/go";
import { Post } from "@/types";
import { PostLink } from "@/components/links/post-link";
import { PostVotes } from "@/features/post-votes";
import { PreviewThumbnail } from "./preview-thumbnail";
import { ProfileLink } from "@/components/links/profile-link";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceLink } from "@/components/links/space-link";
import { Suspense } from "react";
import { getPostCommentCount } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type PostPreviewProps = {
  post: Post;
};

export async function PostPreview({ post }: PostPreviewProps) {
  const timeSincePost = getTimeSinceNow(post.created_at, true);
  const spaceName = await getPostCommunityName(post.posted_in);
  const commentCount = await getPostCommentCount(post.id);
  const postedByUsername = await getPostPostedBy(post.created_by);

  return (
    <div className="grid grid-cols-12 gap-3 px-2 py-3 mt-2 border-t rounded-md sm:px-4 sm:border dark:border-neutral-800 sm:dark:bg-neutral-900">
      <div className="order-2 sm:order-1 col-span-3 sm:col-span-2 aspect-[4/3]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="flex flex-col justify-between order-1 col-span-9 sm:col-span-10 sm:order-2">
        <div>
          <div className="text-xs sm:text-sm ">
            <SpaceLink
              className="font-semibold dark:text-neutral-200"
              spaceName={spaceName}
              spaceId={post.created_by!}
              text={spaceName}
            />

            <span className="dark:text-neutral-400">
              &nbsp;posted by&nbsp;
              <ProfileLink
                username={postedByUsername}
                text={postedByUsername}
              />
              &nbsp;-&nbsp;{timeSincePost}
            </span>
          </div>

          <PostLink
            text={post.title}
            className="mt-1 text-sm font-bold sm:text-base"
            spaceId={post.posted_in}
            spaceName={spaceName}
            postId={post.id}
          />
        </div>

        <div className="items-center hidden gap-2 mt-2 text-sm text-neutral-400 sm:flex">
          <div className="w-fit">
            <PostVotes post={post} horizontal />
          </div>
          <div className="flex items-center gap-2">
            <GoComment />
            {commentCount} comments
          </div>
        </div>
      </div>
      <div className="flex items-center order-3 col-span-12 gap-2 mt-2 text-sm sm:hidden text-neutral-400 ">
        <div className="w-fit">
          <PostVotes post={post} horizontal />
        </div>
        <div className="flex items-center gap-2">
          <GoComment />
          {commentCount} comments
        </div>
      </div>
    </div>
  );
}
