import { NewPostForm } from "@/features/new-post-form";
import { SpaceRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: SpaceRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <NewPostForm params={params} />;
}
