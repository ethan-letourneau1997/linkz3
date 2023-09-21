"use client";

import { Card } from "@/components/ui/card";
import { ProfileSelect } from "@/features/profile-select";

import { SortTabs } from "@/features/sort-tabs.tsx";

export function ProfileHeader() {
  return (
    <Card className="flex items-center justify-between w-full max-w-3xl gap-5 px-4 py-3 mt-5">
      <SortTabs />
      <ProfileSelect />
    </Card>
  );
}
