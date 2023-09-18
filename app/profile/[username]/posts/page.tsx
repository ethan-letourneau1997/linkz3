import { ProfilePosts } from "@/features/profile/components/profile-posts";

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
  return <ProfilePosts searchParams={searchParams} params={params} />;
}
