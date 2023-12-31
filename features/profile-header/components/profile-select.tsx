"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export function ProfileSelect() {
  const router = useRouter();

  const params = useParams();
  const pathname = usePathname();

  const sort = params.sort;
  const page = params.page;

  const [type, setType] = useState(
    pathname.includes("post") ? "posts" : "comments"
  );

  useEffect(() => {
    router.prefetch(`/profile/${params.username}/posts/new/1`);
    router.prefetch(`/profile/${params.username}/comments/new/1`);
  }, [router, params]);

  const handleSortBy = (value: string) => {
    router.push(`/profile/${params.username}/${value}/new/1`);
    setType(value);
  };

  if (page && sort)
    return (
      <div className="flex items-center text-sm">
        <Select value={type} onValueChange={(value) => handleSortBy(value)}>
          <SelectTrigger className="gap-2 pl-0 font-medium border-0 dark:bg-transparent w-fit">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="posts">posts</SelectItem>
            <SelectItem value="comments">comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
}
