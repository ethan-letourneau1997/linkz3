"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSpace } from "@/types";

type SpacesDropdownProps = {
  subscriptions: UserSpace[];
};

export function SpacesDropdown({ subscriptions }: SpacesDropdownProps) {
  const scrollAreaHeight = subscriptions.length > 5 ? "h-[200px]" : "h-fit";
  return (
    <>
      <Menubar className="w-fit">
        <MenubarMenu>
          <MenubarTrigger>My Spaces</MenubarTrigger>
          <MenubarContent>
            <ScrollArea className={scrollAreaHeight}>
              {subscriptions?.map((space) => (
                <MenubarItem key={space.community_id.id}>
                  {space.community_id.name}
                </MenubarItem>
              ))}
            </ScrollArea>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
