import { PreviewSkeleton } from "@/features/post-preview";
import { SpacePagePosts } from "./space-page-posts";
import { Suspense } from "react";

type SpaceLayoutProps = {
  params: {
    spaceName: string;
    spaceId: string;
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function SpaceLayout({ params }: SpaceLayoutProps) {
  return (
    <>
      <Suspense fallback={<PreviewSkeleton count={10} />}>
        <SpacePagePosts params={params} />
      </Suspense>
    </>
  );
}
