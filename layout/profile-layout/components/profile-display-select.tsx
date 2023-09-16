"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

type ProfileDisplaySelectProps = {
  pathname: string;
};

export function ProfileDisplaySelect({ pathname }: ProfileDisplaySelectProps) {
  const params = useParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState(params.type as string);

  const handleSortBy = (value: string) => {
    router.push(`${pathname}/${value}/${params.sortBy}/1`);
    setSortBy(value);
  };

  return (
    <>
      <Select value={sortBy} onValueChange={(value) => handleSortBy(value)}>
        <SelectTrigger className="md:w-[180px] w-[80px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="post">Posts</SelectItem>
          <SelectItem value="comment">Comments</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
