import { NewPostHeader } from "@/features/new-post-header.tsx";
import { SidebarCollapse } from "@/features/sidebar-collapse";
import { SpaceSidebar } from "@/features/space-sidebar";
import { HandleSpacePagination } from "@/layout/space-layout";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-5xl gap-5">
      <div className="flex flex-col w-full max-w-3xl">
        <NewPostHeader />
        {children}
        <HandleSpacePagination />
      </div>
      <SidebarCollapse>
        <SpaceSidebar />
      </SidebarCollapse>
    </div>
  );
}
