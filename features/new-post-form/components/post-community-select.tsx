"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

type PostCommunitySelectProps = {
  setCommunityName: (communityName: string) => void;
  communityName: string;
  setCommunityId: Dispatch<SetStateAction<string>>;
};

export function PostCommunitySelect({
  setCommunityName,
  communityName,
  setCommunityId,
}: PostCommunitySelectProps) {
  const supabase = createClientComponentClient();

  const { data: communities } = useSWR("community", async () => {
    const { data: posts, error } = await supabase.from("community").select("*");

    if (error) throw error.message;
    return posts;
  });

  const handleCommunityChange = (value: string | null) => {
    if (value) {
      const community = communities?.find((c) => c.name === value);

      if (community) {
        setCommunityId(community.id);
        setCommunityName(community.name);
      }
    } else {
      setCommunityId("");
      setCommunityName("");
    }
  };

  return (
    <div className="space-y-1">
      <Label className="dark:text-neutral-300">Community</Label>
      <Select value={communityName} onValueChange={handleCommunityChange}>
        <SelectTrigger className="w-[180px] dark:bg-dark-800  h-9 ">
          <SelectValue placeholder="select a community" />
        </SelectTrigger>
        <SelectContent>
          {communities &&
            communities.map((community) => (
              <SelectItem key={community.id} value={community.name}>
                {community.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
