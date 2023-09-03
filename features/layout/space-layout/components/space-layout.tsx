import { Space } from "@/features/space";
import { SpacePosts } from "./space-posts";
import { Suspense } from "react";

type SpaceLayoutProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
};

export async function SpaceLayout({ params }: SpaceLayoutProps) {
  return (
    <>
      <Space spaceName={params.spaceName} />
      <Suspense fallback={<div>Loading...</div>}>
        <SpacePosts spaceId={params.spaceId} />
      </Suspense>
    </>
  );
}
