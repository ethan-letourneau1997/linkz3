import { HandleProfilePostPagination } from "@/features/profile/components/handle-profile-post-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <HandleProfilePostPagination />
    </div>
  );
}
