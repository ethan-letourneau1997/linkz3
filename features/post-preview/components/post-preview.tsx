import Link from "next/link";
import { Post } from "@/types";
import { PostVotes } from "@/features/post-votes";
import { Suspense } from "react";
import { VotePlaceholer } from "@/features/post-votes/components/vote-placeholder";

type SpacePreviewProps = {
  post: Post;
};

export function PostPreview({ post }: SpacePreviewProps) {
  return (
    <div className="grid grid-cols-12 px-2 py-3 border-neutral-500">
      <div className="col-span-10">
        <Link
          className=" hover:underline"
          // href={`/spaces/${post.id}/${post.title}`}
          href="#"
        >
          {post.title}
        </Link>
      </div>
      <div className="col-span-1">
        <Suspense fallback={<VotePlaceholer />}>
          <PostVotes post={post} />
        </Suspense>
      </div>
    </div>
  );
}
