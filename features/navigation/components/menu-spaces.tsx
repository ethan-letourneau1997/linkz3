"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { UserSpace } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export function MenuSpaces() {
  const supabase = createClientComponentClient();

  const params = useParams();

  useEffect(() => {
    async function fetchUserSubscriptions() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: user_subscriptions } = await supabase
          .from("user_community")
          .select("*, community_id(*)")
          .eq("user_id", user.id);

        if (user_subscriptions) {
          setSubscriptions(user_subscriptions);
        }
      }
    }
    fetchUserSubscriptions();
  }, [params]);

  const [subscriptions, setSubscriptions] = useState<UserSpace[]>([]);

  return (
    <>
      {subscriptions?.map((space) => (
        <Link
          key={space.community_id.id}
          className="block w-full h-full"
          href={`/spaces/${space.community_id.id}/${space.community_id.name}/new/1`}
        >
          {space.community_id.name}
        </Link>
      ))}
    </>
  );
}
