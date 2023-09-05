import { NewPostLayout } from "@/features/layout/new-post-layout";
import { NewPostRouterParams } from "@/features/layout/new-post-layout/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: NewPostRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <NewPostLayout params={params} />;
}
