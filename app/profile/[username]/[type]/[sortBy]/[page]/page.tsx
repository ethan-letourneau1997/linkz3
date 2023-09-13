import { ProfileLayout } from "@/layout/profile-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
    username: string;
    type: "post" | "comment";
  };
};

export default async function Index({ params }: IndexProps) {
  return <ProfileLayout params={params} />;
}
