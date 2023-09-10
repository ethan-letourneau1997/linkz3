"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

type SortPostsProps = {
  newPosts: JSX.Element;
  oldPosts: JSX.Element;
  topPosts: JSX.Element;
};

export function SortPosts({ newPosts, oldPosts, topPosts }: SortPostsProps) {
  const [sortBy, setSortBy] = useState("new");

  const handleSortBy = (value: string) => {
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
      {sortBy === "new" && newPosts}
      {sortBy === "old" && oldPosts}
      {sortBy === "top" && topPosts}
    </>
  );
}
