import { FeedLayout } from "@/layout/feed-layout";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type IndexProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};
export default async function Index({ searchParams }: IndexProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedLayout searchParams={searchParams} />
    </Suspense>
  );
}
