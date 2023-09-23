import {
  NewPostHeader,
  NewPostHeaderFallback,
} from "@/features/new-post-header.tsx";

import { HandleSpacePagination } from "@/features/space";
import { PreviewSkeleton } from "@/features/post-previews/components/preview-skeleton";
import { SidebarCollapse } from "@/features/sidebar-collapse";
import { SpaceSidebar } from "@/features/space-sidebar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-5xl gap-5">
      <div className="grow">
        <Suspense fallback={<NewPostHeaderFallback />}>
          <NewPostHeader />
        </Suspense>
        {children}
        <Suspense fallback={<></>}>
          <HandleSpacePagination />
        </Suspense>
      </div>

      <Suspense fallback={<PreviewSkeleton count={10} />}>
        <SidebarCollapse>
          <SpaceSidebar />
        </SidebarCollapse>
      </Suspense>
    </div>
  );
}
