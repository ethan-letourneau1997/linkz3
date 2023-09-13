import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./sidebar-nav";
import { Title } from "@/components/typography";

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export async function SettingsLayout({ children }: SettingsLayoutProps) {
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
      href: "/settings/messaging",
      title: "Messaging",
    },
    {
      href: "/settings/privacy",
      title: "Privacy",
    },
  ];
  return (
    <Card className="mt-5 ">
      <CardHeader>
        <Title size="h3" as="h1" text="Settings" />
        <p className="pb-3 text-sm text-neutral-400">
          Manage your account settings and preferences.
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-5">
          <SidebarNav items={items} />
          <div className="col-span-3 ">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
