"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPlanetOutline, IoSettingsSharp } from "react-icons/io5";
import { PublicProfile, UserSpace } from "@/types";
import { useEffect, useState } from "react";

import { BsFillRocketFill } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { GiGalaxy } from "react-icons/gi";
import { IoChevronDown } from "react-icons/io5";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type AvatarDropdownProps = {
  profile: PublicProfile;
  userSpaces: UserSpace[];
};

export function AvatarDropdown({ profile, userSpaces }: AvatarDropdownProps) {
  const [spaces, setSpaces] = useState(userSpaces);

  const [open, setOpen] = useState(false);

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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="px-4 py-2 border border-transparent rounded hover:border-neutral-800">
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {profile.username}
          <IoChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>{profile.username}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaUserAstronaut className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BsFillRocketFill className="w-4 h-4 mr-2 " />
            Feed
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GiGalaxy className="w-4 h-4 mr-2 " />
            Subscriptions
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IoPlanetOutline className="w-4 h-4 mr-2" />
              My Spaces
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput placeholder="Filter label..." autoFocus={true} />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    {spaces?.map((space) => (
                      <CommandItem key={space.community_id.id} className="py-0">
                        <Link
                          className="w-full py-1.5"
                          href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                        >
                          {space.community_id.name}
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <IoSettingsSharp className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
