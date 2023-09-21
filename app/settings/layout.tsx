import { UserSettings } from "@/features/user-settings";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl ">
      <UserSettings>{children}</UserSettings>
    </div>
  );
}
