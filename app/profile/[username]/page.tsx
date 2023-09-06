import { ProfileLayout } from "@/features/layout/profile-layout";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    username: string;
  };
};

export default async function Index({ params }: IndexProps) {
  return <ProfileLayout username={params.username} />;
}
