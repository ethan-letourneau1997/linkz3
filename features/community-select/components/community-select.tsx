"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

export function CommunitySelect() {
  const params = useParams();
  const router = useRouter();

  const spaceName = params.spaceName as string;

  const supabase = createClientComponentClient();

  const { data: communities } = useSWR("community", async () => {
    const { data: posts, error } = await supabase.from("community").select("*");

    if (error) throw error.message;
    return posts;
  });

  const handleCommunityChange = (value: string | null) => {
    if (spaceName) {
      const community = communities?.find((c) => c.name === value);
      router.replace(`/spaces/${community.id}/${community.name}/create`);
    } else {
      const community = communities?.find((c) => c.name === value);
      router.push(`/spaces/${community.id}/${community.name}/create`);
    }
  };

  if (communities)
    return (
      <>
        <Card className="flex items-center w-full max-w-3xl px-4 py-2 mt-5 dark:text-neutral-300">
          <h1 className="text-xl font-medium">Create a post in</h1>&nbsp;&nbsp;
          <Select value={spaceName} onValueChange={handleCommunityChange}>
            <SelectTrigger className="gap-2 text-xl font-medium w-fit dark:bg-transparent h-9 space-select-trigger">
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
        </Card>
        {/* <Separator className="mt-2 " /> */}
      </>
    );
}
