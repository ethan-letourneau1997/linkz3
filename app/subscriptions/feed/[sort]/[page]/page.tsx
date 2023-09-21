import { Feed } from "@/features/feed";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <Feed params={params} />;
}
