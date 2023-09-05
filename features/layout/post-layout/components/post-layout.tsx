import { Post } from "@/features/post";
import { PostRouterParams } from "@/types";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function PostLayout({ params }: PostLayoutProps) {
  return <Post params={params} />;
}
