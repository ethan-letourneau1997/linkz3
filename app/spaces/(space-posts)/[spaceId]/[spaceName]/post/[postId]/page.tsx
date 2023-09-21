import { Post } from "@/features/post";
import { PostRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: PostRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <Post params={params} />;
}
