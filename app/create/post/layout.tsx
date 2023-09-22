import { SpaceSelect } from "@/features/new-post-form";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpaceSelect />
      {children}
    </>
  );
}
