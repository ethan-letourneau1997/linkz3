import { FeedDetails } from "@/layout/feed-layout";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl">
      <FeedDetails />
      {children}
    </div>
  );
}
