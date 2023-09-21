import { SpacePosts } from "@/features/space";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export default async function Index({ params, searchParams }: IndexProps) {
  if (!searchParams.page || !searchParams.sort) {
    redirect(`/spaces/${params.spaceId}/${params.spaceName}?page=1&sort=new`);
  }

  return <SpacePosts params={params} searchParams={searchParams} />;
}
