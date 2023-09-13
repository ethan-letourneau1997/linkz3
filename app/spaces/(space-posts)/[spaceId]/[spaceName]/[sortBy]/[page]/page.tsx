import { SpacePageLayout } from "@/layout/space-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <SpacePageLayout params={params} />;
}
