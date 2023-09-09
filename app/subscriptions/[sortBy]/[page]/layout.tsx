import { SubscriptionPagination } from "@/features/layout/subscriptions-layout/components/subscription-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <SubscriptionPagination />
    </div>
  );
}
