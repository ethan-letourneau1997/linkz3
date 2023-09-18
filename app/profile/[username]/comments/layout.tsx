import { HandleProfilePostsPagination } from "@/features/page-navigation/components/handle-profile-posts-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <HandleProfilePostsPagination />
    </div>
  );
}
