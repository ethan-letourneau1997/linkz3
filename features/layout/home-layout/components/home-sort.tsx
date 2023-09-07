"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

type HomeSortType = {
  newPosts: JSX.Element;
  oldPosts: JSX.Element;
  topPosts?: JSX.Element;
};

export function HomeSort({ newPosts, oldPosts, topPosts }: HomeSortType) {
  const [sortBy, setSortBy] = useState("new");
  return (
    <>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
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
      <div className="w-full">{sortBy}</div>
    </>
  );
}