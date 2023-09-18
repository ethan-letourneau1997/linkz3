import { ProfileCommentPagination } from "@/features/profile/components/profile-comment-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <ProfileCommentPagination />
    </div>
  );
}
