import { Post } from "@/types";

type TextPostContentProps = {
  post: Post;
};

export async function TextPostContent({ post }: TextPostContentProps) {
  return (
    <div
      className="max-w-full prose dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: post.content || "" }}
    />
  );
}
