import { CommunitySelect } from "@/features/community-select";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CommunitySelect />
      {children}
    </>
  );
}
