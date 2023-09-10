"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEffect, useState } from "react";

import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type SpacesDropdownProps = {
  userId: string;
};

export function SpacesDropdown({ userId }: SpacesDropdownProps) {
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUserSubscriptions() {
      const { data: user_subscriptions } = await supabase
        .from("user_community")
        .select("*, community_id(*)")
        .eq("user_id", userId);

      if (user_subscriptions) {
        setSubscriptions(user_subscriptions);
      }
    }
    fetchUserSubscriptions();
  }, [userId]);

  const [subscriptions, setSubscriptions] = useState<UserSpace[]>([]);

  return (
    <>
      <Menubar className="dark:bg-transparent dark:border-0 w-fit">
        <MenubarMenu>
          <MenubarTrigger className="dark:bg-transparent ">
            My Spaces
          </MenubarTrigger>
          <MenubarContent>
            <ScrollArea
              className={subscriptions.length > 5 ? "h-[200px]" : "h-fit"}
            >
              {subscriptions?.map((space) => (
                <MenubarItem key={space.community_id.id}>
                  <Link
                    className="w-full h-full "
                    href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                  >
                    {space.community_id.name}
                  </Link>
                </MenubarItem>
              ))}
            </ScrollArea>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
}
