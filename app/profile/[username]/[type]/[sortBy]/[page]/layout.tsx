import { ProfilePagination } from "@/features/layout/profile-layout/components/profile-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <ProfilePagination />
    </div>
  );
}
