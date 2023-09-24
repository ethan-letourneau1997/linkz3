"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoPlanetOutline, IoSettingsSharp } from "react-icons/io5";

import { Space } from "@/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type SpaceOptionsDropdownProps = {
  space: Space;
};

export function SpaceOptionsDropdown({ space }: SpaceOptionsDropdownProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(`/spaces/${space.id}/${space.name}`);
    router.prefetch(`/spaces/${space.id}/${space.name}/settings`);
  }, [router]);

  function handleVisit() {
    router.push(`/spaces/${space.id}/${space.name}`);
  }

  function handleSettings() {
    router.push(`/spaces/${space.id}/${space.name}/settings`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="dark:text-neutral-300 dark:hover:text-neutral-100">
        <IoSettingsSharp />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{space.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleVisit}
          className="hover:cursor-pointer"
        >
          <IoPlanetOutline className="mr-2" />
          Visit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSettings}
          className="hover:cursor-pointer"
        >
          <IoSettingsSharp className="mr-2" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
