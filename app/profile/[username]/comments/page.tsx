import { ProfileComments } from "@/features/profile";

export const dynamic = "force-dynamic";

type IndexProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
  params: {
    username: string;
  };
};

export default async function Index({ params, searchParams }: IndexProps) {
  return <ProfileComments searchParams={searchParams} params={params} />;
}
