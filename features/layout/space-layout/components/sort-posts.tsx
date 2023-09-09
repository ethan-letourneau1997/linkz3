"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

type SortType = {
  newPosts: JSX.Element;
  oldPosts: JSX.Element;
  topPosts?: JSX.Element;
};

export function Sort({ newPosts, oldPosts, topPosts }: SortType) {
  const [sortBy, setSortBy] = useState("new");

  return (
    <>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="md:w-[180px] w-[80px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="old">Old</SelectItem>
          <SelectItem value="top">Top</SelectItem>
        </SelectContent>
      </Select>

      <div className="mt-3">
        {sortBy === "new" && newPosts}
        {sortBy === "old" && oldPosts}
        {sortBy === "top" && topPosts}
      </div>
    </>
  );
}
