import { Comments } from "@/features/comments";
import { Post } from "@/features/post";
import { PostRouterParams } from "@/types";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function PostLayout({ params }: PostLayoutProps) {
  return (
    <div className="w-full max-w-3xl">
      <Post params={params} />
      <Comments params={params} />
    </div>
  );
}
