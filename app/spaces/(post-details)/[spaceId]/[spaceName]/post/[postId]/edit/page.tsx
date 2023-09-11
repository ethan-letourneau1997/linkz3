import { PostEditor } from "@/features/post-editor";
import { PostRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: PostRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <PostEditor params={params} />;
}
