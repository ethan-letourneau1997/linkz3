import { PageNavigation } from "@/features/layout/space-layout/components/page-navigation";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <PageNavigation />
    </div>
  );
}
