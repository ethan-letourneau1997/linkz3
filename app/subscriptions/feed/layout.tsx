import { FeedHeader } from "@/layout/feed";
import { HandleSubscriptionPagination } from "@/features/page-navigation";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl">
      <FeedHeader />
      {children}
      <HandleSubscriptionPagination />
    </div>
  );
}
