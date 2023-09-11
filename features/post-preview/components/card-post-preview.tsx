import { Post, PostPreview as PostPreviewType } from "@/types";
import { getPostCommunityName, getPostPostedBy } from "@/helpers/post-helpers";

import { Card } from "@/components/ui/card";
import { GoComment } from "react-icons/go";
import { PostLink } from "@/components/links/post-link";
import { PostVotes } from "@/features/post-votes";
import { PreviewThumbnail } from "./preview-thumbnail";
import { ProfileLink } from "@/components/links/profile-link";
import { Skeleton } from "@/components/ui/skeleton";
import { SpaceLink } from "@/components/links/space-link";
import { Suspense } from "react";
import { getPostCommentCount } from "@/helpers/post-helpers";
import { getTimeSinceNow } from "@/lib/get-time-since-now";

type CardPostPreviewProps = {
  post: Post | PostPreviewType;
};

export async function CardPostPreview({ post }: CardPostPreviewProps) {
  const timeSincePost = getTimeSinceNow(post.created_at, true);
  const spaceName = await getPostCommunityName(post.posted_in);
  const commentCount = await getPostCommentCount(post.id!);
  const postedByUsername = await getPostPostedBy(post.created_by);

  return (
    <Card className="grid grid-cols-12 gap-3 px-2 py-3 rounded-md sm:mt-2 sm:px-4 ">
      <div className="order-2 sm:order-1 col-span-3 sm:col-span-2 aspect-[4/3]">
        <Suspense fallback={<Skeleton className="w-full h-full" />}>
          <PreviewThumbnail post={post} />
        </Suspense>
      </div>
      <div className="flex flex-col justify-between order-1 col-span-9 sm:order-2">
        <div>
          <div className="text-xs ">
            <SpaceLink
              className="font-semibold dark:text-neutral-200"
              spaceName={spaceName}
              spaceId={post.posted_in!}
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
            className="mt-1 text-sm font-medium sm:text-base text-neutral-200"
            spaceId={post.posted_in}
            spaceName={spaceName}
            postId={post.id!}
          />
        </div>

        <div className="items-center hidden gap-2 mt-2 text-sm sm:flex text-neutral-400">
          <GoComment />
          {commentCount} comments
        </div>
      </div>
      <div className="order-3 hidden col-span-1 sm:block ">
        <div className="flex justify-end h-full ">
          <PostVotes post={post} />
        </div>
      </div>
      <div className="flex items-center order-4 col-span-12 gap-2 mt-2 text-sm sm:hidden text-neutral-400 ">
        <div className="w-fit sm:hidden">
          <PostVotes post={post} horizontal />
        </div>
        <div className="flex items-center gap-2">
          <GoComment />
          {commentCount} comments
        </div>
      </div>
    </Card>
  );
}