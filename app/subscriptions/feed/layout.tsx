import { FeedSidebar } from "@/features/feed-sidebar";
import { HandleFeedPagination } from "@/features/feed";
import { NewPostHeader } from "@/features/new-post-header.tsx";
import { SidebarCollapse } from "@/features/sidebar-collapse";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-5xl gap-5 ">
      <div className="grow ">
        <NewPostHeader />

        {children}
        <HandleFeedPagination />
      </div>
      <SidebarCollapse>
        <FeedSidebar />
      </SidebarCollapse>
    </div>
    // <div className="flex gap-5">
    //   <div className="w-full max-w-3xl">
    //     <NewPostHeader />
    //     {children}
    //     <HandleFeedPagination />
    //   </div>
    //   <SidebarCollapse>
    //     <FeedSidebar />
    //   </SidebarCollapse>
    // </div>
  );
}
