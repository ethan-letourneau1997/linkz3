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
    <div className="flex w-full max-w-5xl gap-5 ">
      <div className="grow ">
        <ProfileHeader />

        {children}
      </div>
      <SidebarCollapse>
        <ProfileSidebar />
      </SidebarCollapse>
    </div>
  );
}
