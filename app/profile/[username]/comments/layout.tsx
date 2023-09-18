import { ProfilePostPagination } from "@/features/profile/components/profile-post-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <ProfilePostPagination />
    </div>
  );
}
