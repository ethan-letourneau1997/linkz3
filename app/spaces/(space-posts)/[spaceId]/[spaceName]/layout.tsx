import { HandleSpacePagination } from "@/features/page-navigation";
import { HandleSpaceSidebar } from "./handle-space-sidar";
import { SpaceHeader } from "@/features/space-header";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-5xl gap-5">
      <div className="flex flex-col w-full max-w-3xl">
        <SpaceHeader />
        {children}
        <HandleSpacePagination />
      </div>
      <HandleSpaceSidebar />
    </div>
  );
}
