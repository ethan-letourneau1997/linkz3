"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

export function SortPosts() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const [sortBy, setSortBy] = useState(sort as string);

  const handleSortBy = (value: string) => {
    router.push(`${pathname}?page=${page}&sort=${value}`);
    setSortBy(value);
  };

  if (page && sort)
    return (
      <>
        <Select value={sortBy} onValueChange={(value) => handleSortBy(value)}>
          <SelectTrigger className="md:w-[180px] w-[80px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="old">Old</SelectItem>
            <SelectItem value="top">Top</SelectItem>
          </SelectContent>
        </Select>
      </>
    );
}
