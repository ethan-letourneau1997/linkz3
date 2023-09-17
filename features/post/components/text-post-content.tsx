import { Post } from "@/types";

type TextPostContentProps = {
  post: Post;
};

export async function TextPostContent({ post }: TextPostContentProps) {
  return (
    <div
      className="w-full text-sm prose dark:prose-invert md:text-base dark:text-neutral-300"
      dangerouslySetInnerHTML={{ __html: post.content || "" }}
    />
  );
}
