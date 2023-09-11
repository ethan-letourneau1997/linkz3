import { FeedLayout } from "@/layout/feed-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <FeedLayout params={params} />;
}
