import { SettingsLayout } from "@/layout/settings-layout";

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl ">
      <SettingsLayout>{children}</SettingsLayout>
    </div>
  );
}
