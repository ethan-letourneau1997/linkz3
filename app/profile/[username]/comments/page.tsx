import { ProfileCommentLayout } from "@/layout/profile-layout/components/profile-comment-layout";

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
  return <ProfileCommentLayout searchParams={searchParams} params={params} />;
}
