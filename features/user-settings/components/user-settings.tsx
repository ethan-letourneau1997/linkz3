import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { SettingsNav } from "./settings-nav";

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export async function UserSettings({ children }: SettingsLayoutProps) {
  const items = [
    {
      href: "/settings/profile",
      title: "Profile",
    },
    {
      href: "/settings/account",
      title: "Account",
    },
    {
      href: "/settings/admin",
      title: "Admin",
    },
    {
      href: "/settings/privacy",
      title: "Privacy",
    },
  ];
  return (
    <Card className="pb-5 mt-5 dark:bg-dark-900">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="pb-3 text-sm text-neutral-400">
          Manage your account settings and preferences.
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-4 lg:col-span-1">
            <SettingsNav items={items} />
          </div>
          <div className="col-span-4 lg:col-span-3">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
