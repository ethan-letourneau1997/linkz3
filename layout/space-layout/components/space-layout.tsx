import { PreviewSkeleton } from "@/features/post-preview";
import { SpacePagePosts } from "./space-page-posts";
import { Suspense } from "react";

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
  return (
    <>
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        <SpacePagePosts params={params} searchParams={searchParams} />
      </Suspense>
    </>
  );
}
