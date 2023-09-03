import Link from "next/link";
import { Post } from "@/types";

type SpacePreviewProps = {
  post: Post;
};

export function PostPreview({ post }: SpacePreviewProps) {
  return (
    <div className="px-2 py-3 border-neutral-500">
      <Link
        className=" hover:underline"
        // href={`/spaces/${post.id}/${post.title}`}
        href="#"
      >
        {post.title}
      </Link>
    </div>
  );
}
