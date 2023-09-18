import { HandleSubscriptionPagination } from "@/features/page-navigation";
import { NewPostHeader } from "@/features/new-post-header.tsx";
import { SidebarCollapse } from "@/features/sidebar-collapse";
import { FeedSidebar } from "@/features/feed-sidebar";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-full max-w-3xl">
        <NewPostHeader />
        {children}
        <HandleSubscriptionPagination />
      </div>
      <SidebarCollapse>
        <FeedSidebar />
      </SidebarCollapse>
    </div>
  );
}
