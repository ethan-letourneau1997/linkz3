"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

import Link from "next/link";
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type MobileSpacesProps = {
  userSpaces: UserSpace[];
};

export function MobileSpaces({ userSpaces }: MobileSpacesProps) {
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
    <Accordion type="single" collapsible className="-mx-5 ">
      <AccordionItem
        className="px-6 border-t dark:border-neutral-800"
        value="item-1"
      >
        <AccordionTrigger className="py-3">
          <h3 className="text-base">My Spaces</h3>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-2 mt-2">
            {spaces?.map((space) => (
              <Link
                className="text-base"
                key={space.community_id.id}
                href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
              >
                {space.community_id.name}
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
