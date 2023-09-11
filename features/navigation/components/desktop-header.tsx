"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import Link from "next/link";
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export function DesktopHeader({ userId }: { userId: string }) {
  const supabase = createClientComponentClient();

  const params = useParams();

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
  }, [userId, params]);

  const [subscriptions, setSubscriptions] = useState<UserSpace[]>([]);
  return (
    <div className="flex items-center h-14 dark:text-neutral-200">
      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm">Spaces</DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <span>Discover</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <span>Subscriptions</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>My Spaces</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {subscriptions?.map((space) => (
                  <DropdownMenuItem key={space.community_id.id}>
                    <Link
                      className="w-full"
                      href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
                    >
                      {space.community_id.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem>
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>More...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
