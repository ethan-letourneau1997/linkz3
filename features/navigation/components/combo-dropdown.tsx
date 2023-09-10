"use client";

import { Calendar, MoreHorizontal, Tags, Trash, User } from "lucide-react";
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
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

type ComboboxDropdownMenuProps = {
  userId: string;
};

export function ComboboxDropdownMenu({ userId }: ComboboxDropdownMenuProps) {
  const [label, setLabel] = useState("feature");
  const [open, setOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState<UserSpace[]>([]);

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

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          Spaces
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Assign to...
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Calendar className="w-4 h-4 mr-2" />
            Set due date...
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tags className="w-4 h-4 mr-2" />
              Old Spaces
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput placeholder="Filter label..." autoFocus={true} />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    {labels.map((label) => (
                      <CommandItem
                        key={label}
                        onSelect={(value) => {
                          setLabel(value);
                          setOpen(false);
                        }}
                      >
                        {label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Tags className="w-4 h-4 mr-2" />
              My Spaces
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-0">
              <Command>
                <CommandInput placeholder="Filter label..." autoFocus={true} />
                <CommandList>
                  <CommandEmpty>No label found.</CommandEmpty>
                  <CommandGroup>
                    {subscriptions?.map((space) => (
                      <CommandItem key={space.community_id.id}>
                        <Link
                          className="w-full"
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
          <DropdownMenuItem className="text-red-600">
            <Trash className="w-4 h-4 mr-2" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
