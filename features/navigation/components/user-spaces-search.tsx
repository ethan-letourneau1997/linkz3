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
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type UserSpacesDemoType = {
  userSpaces: UserSpace[];
};

export function UserSpaces({ userSpaces }: UserSpacesDemoType) {
  const [open, setOpen] = useState(false);
  const [spaces, setSpaces] = useState(userSpaces);

  const supabase = createClientComponentClient();

  useEffect(() => {
    setSpaces(userSpaces);
  }, [userSpaces]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_community" },
        (payload) =>
          setSpaces((spaces) => [...spaces, payload.new as UserSpace])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setSpaces, spaces]);

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
            {spaces?.map((space) => (
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
