import { HandleProfileCommentPagination } from "@/features/page-navigation/components/handle-profile-comment-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <HandleProfileCommentPagination />
    </div>
  );
}
