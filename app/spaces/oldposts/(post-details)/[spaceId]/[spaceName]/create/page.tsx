import { NewPostLayout } from "@/layout/new-post-layout";
import { SpaceRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: SpaceRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <NewPostLayout params={params} />;
}
