import { HandleSpaceSidebar } from "./handle-space-sidar";
import { SpaceDetails } from "@/layout/space-layout";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-5">
      <div className="w-full max-w-3xl">
        <Suspense fallback={<></>}>
          <SpaceDetails />
        </Suspense>
        {children}
      </div>
      <HandleSpaceSidebar />
    </div>
  );
}
