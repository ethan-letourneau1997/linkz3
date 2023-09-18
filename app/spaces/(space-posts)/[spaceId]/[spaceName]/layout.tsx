import { HandleSpacePagination } from "@/features/page-navigation";
import { HandleSpaceSidebar } from "./handle-space-sidar";

import { NewPostHeader } from "@/features/new-post-header.tsx";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full max-w-5xl gap-5">
      <div className="flex flex-col w-full max-w-3xl">
        <NewPostHeader />
        {children}
        <HandleSpacePagination />
      </div>
      <HandleSpaceSidebar />
    </div>
  );
}
