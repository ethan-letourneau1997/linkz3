"use client";

import {
  createSubscription,
  deleteSubscription,
} from "@/lib/space/subscription-helpers";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type SidebarSubscriptionButtonProps = {
  isSubscribed: boolean;
  spaceId: string;
  spaceName: string;
};

export function SidebarSubscriptionButton({
  isSubscribed,
  spaceId,
  spaceName,
}: SidebarSubscriptionButtonProps) {
  const [optomisticIsSubscribed, setOptomisticIsSubscribed] =
    useState(isSubscribed);

  const { toast } = useToast();

  function handleSubscribe() {
    setOptomisticIsSubscribed(true);
    createSubscription(spaceId);
    toast({
      title: "Subscribed",
      description: `You are now a member of ${spaceName}.`,
    });
  }

  function handleUnsubscribe() {
    setOptomisticIsSubscribed(false);
    deleteSubscription(spaceId);
    toast({
      title: "Unsubscribed",
      description: `You are no longer a member of ${spaceName}.`,
    });
  }

  return (
    <>
      {optomisticIsSubscribed ? (
        <Button
          size="sm"
          onClick={handleUnsubscribe}
          className="w-full dark:bg-dark-800 hover:dark:bg-transparent hover:dark:outline-neutral-400 group"
          variant="outline"
        >
          <span className="block group-hover:hidden"> Subscribed</span>
          <span className="hidden group-hover:block"> Unsubscribe</span>
        </Button>
      ) : (
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
