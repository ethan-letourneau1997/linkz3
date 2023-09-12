import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
  };
};

export default async function Index({ params }: IndexProps) {
  redirect(`/spaces/${params.spaceId}/${params.spaceName}/new/1`);
}
