"use client";

import {
  createSubscription,
  deleteSubscription,
} from "@/lib/space/subscription-helpers";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { checkUserSubscription } from "@/lib/space/check-user-subscription";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type SidebarSubscriptionButtonProps = {
  // isSubscribed: boolean;
  spaceId: string;
  spaceName: string;
};

export function SidebarSubscriptionButton({
  spaceId,
  spaceName,
}: SidebarSubscriptionButtonProps) {
  const router = useRouter();

  const [optomisticIsSubscribed, setOptomisticIsSubscribed] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    async function checkSubscription() {
      const data = await checkUserSubscription(spaceId);
      setOptomisticIsSubscribed(data);
    }

    checkSubscription();
  }, []);

  function handleSubscribe() {
    setOptomisticIsSubscribed(true);
    createSubscription(spaceId);
    toast({
      title: "Subscribed",
      description: `You are now a member of ${spaceName}.`,
    });
    router.refresh();
  }

  function handleUnsubscribe() {
    setOptomisticIsSubscribed(false);
    deleteSubscription(spaceId);
    toast({
      title: "Unsubscribed",
      description: `You are no longer a member of ${spaceName}.`,
    });
    router.refresh();
  }

  return (
    <>
      {optomisticIsSubscribed == true && (
        <Button
          size="sm"
          onClick={handleUnsubscribe}
          className="w-full dark:bg-dark-800 hover:dark:bg-transparent hover:dark:outline-neutral-400 group"
          variant="outline"
        >
          <span className="block group-hover:hidden"> Subscribed</span>
          <span className="hidden group-hover:block"> Unsubscribe</span>
        </Button>
      )}

      {optomisticIsSubscribed == false && (
        <Button
          size="sm"
          onClick={handleSubscribe}
          className="w-full border dark:bg-transparent dark:border-neutral-800"
          variant="secondary"
        >
          Subscribe
        </Button>
      )}
    </>
  );
}
