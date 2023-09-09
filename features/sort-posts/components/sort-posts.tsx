"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

type SortPostProps = {
  pathname: string;
};

export function SortPosts({ pathname }: SortPostProps) {
  const params = useParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState(params.sortBy as string);

  const handleSortBy = (value: string) => {
    router.push(`${pathname}/${value}/1`);
    setSortBy(value);
  };

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
