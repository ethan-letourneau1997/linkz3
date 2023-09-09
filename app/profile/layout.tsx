import { ProfileDetails } from "@/features/layout/profile-layout/components/profile-details";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl">
      <ProfileDetails />
      {children}
    </div>
  );
}
