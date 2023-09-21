import { ProfileComments } from "@/features/profile";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    username: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <ProfileComments params={params} />;
}
