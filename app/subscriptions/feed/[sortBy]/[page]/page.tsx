import { FeedLayout } from "@/layout/feed-layout";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedLayout params={params} />
    </Suspense>
  );
}
