import { PreviewSkeleton } from "@/features/post-preview";
import { SpacePagePosts } from "./space-page-posts";
import { Suspense } from "react";

type SpacePageLayoutProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function SpacePageLayout({ params }: SpacePageLayoutProps) {
  return (
    <>
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        <SpacePagePosts params={params} />
      </Suspense>
    </>
  );
}
