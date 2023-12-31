import { HandleProfileCommentPagination } from "@/features/profile";

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
