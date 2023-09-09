import { SpacePageLayout } from "@/features/layout/space-layout/components/space-page-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
  };
};

export default async function Index({ params }: IndexProps) {
  return <SpacePageLayout params={params} />;
}
