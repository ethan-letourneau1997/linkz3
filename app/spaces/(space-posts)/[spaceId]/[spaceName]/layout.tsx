import { SpaceDetails } from "@/layout/space-layout";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl">
      <SpaceDetails />
      {children}
    </div>
  );
}
