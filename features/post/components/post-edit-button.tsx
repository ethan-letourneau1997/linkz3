"use client";

import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { Post } from "@/types";
import { Tooltip } from "flowbite-react";

type PostEditButtonProps = {
  post: Post;
};

export function PostEditButton({ post }: PostEditButtonProps) {
  return (
    <Tooltip content="Edit Post" style="dark">
      <Link href={`${post.id}/edit`}>
        <AiOutlineEdit className="text-xl" />
      </Link>
    </Tooltip>
  );
}
