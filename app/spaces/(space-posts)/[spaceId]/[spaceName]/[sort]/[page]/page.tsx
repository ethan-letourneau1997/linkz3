import { SpacePosts } from "@/features/space/components/new-space-posts";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <SpacePosts params={params} />;
}
