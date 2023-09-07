"use client";

import { Post, PostRouterParams } from "@/types";

import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { PostDeleteButton } from "./post-delete-button";
import { Tooltip } from "flowbite-react";

type PostOptionsProps = {
  post: Post;
  params: PostRouterParams;
};

export function PostOptions({ post, params }: PostOptionsProps) {
  return (
    <div className="flex gap-2">
      <Tooltip content="Delete Post" style="dark">
        <PostDeleteButton post={post} params={params} />
      </Tooltip>
      <Tooltip content="Edit Post" style="dark">
        <Link href={`${post.id}/edit`}>
          <AiOutlineEdit className="text-xl" />
        </Link>
      </Tooltip>
    </div>
  );
}
