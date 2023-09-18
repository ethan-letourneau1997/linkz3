"use client";

import { Card } from "@/components/ui/card";
import { SortTabs } from "@/features/sort-tabs.tsx";

export function FeedHeader() {
  return (
    <Card className="flex items-center justify-between gap-5 px-4 py-3 mt-5">
      <SortTabs />
    </Card>
  );
}
