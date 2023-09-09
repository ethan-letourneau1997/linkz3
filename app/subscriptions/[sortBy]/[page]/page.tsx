import { SubscriptionsLayout } from "@/features/layout/subscriptions-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <SubscriptionsLayout params={params} />;
}
