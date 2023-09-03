import { SpaceLayout } from "@/features/layout/space-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
  };
};

export default async function Index({ params }: IndexProps) {
  return <SpaceLayout spaceName={params.spaceName} />;
}
