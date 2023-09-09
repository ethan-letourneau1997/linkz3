import { PreviewSkeleton } from "@/features/post-preview";
import { Space } from "@/features/space";
import { SpacePagePosts } from "./space-page-posts";
import { Suspense } from "react";

type SpacePageLayoutProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
  };
};

export async function SpacePageLayout({ params }: SpacePageLayoutProps) {
  return (
    <>
      <Space spaceName={params.spaceName} />
      <div>{params.page}</div>
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        <SpacePagePosts params={params} />
      </Suspense>
    </>
  );
}
