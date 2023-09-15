import { HandleSpacePagination } from "@/features/page-navigation";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {/* <HandleSpacePagination /> */}
    </div>
  );
}
