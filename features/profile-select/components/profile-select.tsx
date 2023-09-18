"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { useState } from "react";

export function ProfileSelect() {
  const router = useRouter();

  const params = useParams();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const [type, setType] = useState(
    pathname.includes("post") ? "posts" : "comments"
  );

  const handleSortBy = (value: string) => {
    router.push(`/profile/${params.username}/${value}?page=1&sort=new`);
    setType(value);
  };

  if (page && sort)
    return (
      <div className="flex items-center text-sm">
        <span className="text-neutral-400">viewing&nbsp;</span>
        <Select value={type} onValueChange={(value) => handleSortBy(value)}>
          <SelectTrigger className="gap-2 pl-0 font-medium border-0 dark:bg-transparent w-fit">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="posts">Posts</SelectItem>
            <SelectItem value="comments">Comments</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
}
