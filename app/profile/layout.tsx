import { HandleProfilePagination } from "@/features/page-navigation";
import { ProfileHeader } from "@/features/profile-header";
import { ProfileSidebar } from "@/features/profile-sidebar";
import { SidebarCollapse } from "@/features/sidebar-collapse";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-full max-w-3xl">
        <ProfileHeader />
        {children}
        <HandleProfilePagination />
      </div>
      <SidebarCollapse>
        <ProfileSidebar />
      </SidebarCollapse>
    </div>
  );
}
