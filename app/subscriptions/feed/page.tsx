import { Feed } from "@/layout/feed";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type IndexProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};
export default async function Index({ searchParams }: IndexProps) {
  if (!searchParams.page || !searchParams.sort) {
    redirect(`/subscriptions/feed?page=1&sort=new`);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Feed searchParams={searchParams} />
    </Suspense>
  );
}
