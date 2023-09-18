import { PostLayout } from "@/layout/post-layout";
import { PostRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: PostRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <PostLayout params={params} />;
}
