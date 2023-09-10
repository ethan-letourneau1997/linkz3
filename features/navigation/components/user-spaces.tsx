"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

type UserSpacesDemoType = {
  userId: string;
};

export function UserSpaces({ userId }: UserSpacesDemoType) {
  const supabase = createClientComponentClient();
  const [open, setOpen] = useState(false);

  // const [spaces, setSpaces] = useState<UserSpace[]>([]);

  const params = useParams();

  useEffect(() => {
    console.log("refresh");
  }, []);

  const { data: user_subscriptions } = useQuery(
    supabase
      .from("user_community")
      .select("*, community_id(*)")
      .eq("user_id", userId),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // console.log(data);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="text-sm">
        <Button className=" min-w-fit" variant="outline">
          My Spaces
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput />
          <CommandEmpty>No spaces found.</CommandEmpty>
          <CommandGroup>
            {user_subscriptions?.map((space) => (
              <CommandItem key={space.community_id.id} className="py-0">
                <Link
                  className="w-full h-full py-1.5"
                  href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                >
                  {space.community_id.name}
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
