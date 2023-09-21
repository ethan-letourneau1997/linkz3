import { ProfilePosts } from "@/features/profile/components/profile-posts";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    username: string;
    page: string;
    sort: "top" | "new" | "old";
  };
};

export default async function Index({ params }: IndexProps) {
  return <ProfilePosts params={params} />;
}
