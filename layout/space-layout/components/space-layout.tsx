import { SpacePagePosts } from "./space-page-posts";

type SpaceLayoutProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
};

export async function SpaceLayout({ params, searchParams }: SpaceLayoutProps) {
  return <SpacePagePosts params={params} searchParams={searchParams} />;
}
