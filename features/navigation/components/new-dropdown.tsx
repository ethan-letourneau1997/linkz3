"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiPlus } from "react-icons/hi";
import { IoPlanetOutline } from "react-icons/io5";
import Link from "next/link";
import { RiSpaceShipFill } from "react-icons/ri";

export function NewDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HiPlus className="text-base text-neutral-200 hover:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Create New</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem className="py-0 ">
          <Link
            href={"/create/post"}
            className="w-full py-1.5 flex items-center gap-1"
          >
            <RiSpaceShipFill className="w-4 h-4 mr-2" />
            Post
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-0 ">
          <Link
            href={"/create/space"}
            className="w-full py-1.5 flex gap-1 items-center"
          >
            <IoPlanetOutline className="w-4 h-4 mr-2" />
            Space
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
