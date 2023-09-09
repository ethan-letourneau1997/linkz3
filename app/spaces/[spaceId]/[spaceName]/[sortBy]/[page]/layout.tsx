import { SpacePagination } from "@/features/layout/space-layout/components/space-pagination";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <SpacePagination />
    </div>
  );
}
