"use client";

import {
  createSubscription,
  deleteSubscription,
} from "@/lib/space/subscription-helpers";

import { Button } from "@/components/ui/button";
import { Space } from "@/types";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

type UserSubscriptionProps = {
  isSubscribed: boolean;
  space: Space;
};

export function SubscribeButton({
  isSubscribed,
  space,
}: UserSubscriptionProps) {
  const [optomisticIsSubscribed, setOptomisticIsSubscribed] =
    useState(isSubscribed);

  const { toast } = useToast();

  function handleSubscribe() {
    setOptomisticIsSubscribed(true);
    createSubscription(space.id);
    toast({
      title: "Subscribed",
      description: `You are now a member of ${space.name}.`,
    });
  }

  function handleUnsubscribe() {
    setOptomisticIsSubscribed(false);
    deleteSubscription(space.id);
    toast({
      title: "Unsubscribed",
      description: `You are no longer a member of ${space.name}.`,
    });
  }

  return (
    <>
      {optomisticIsSubscribed ? (
        <Button
          onClick={handleUnsubscribe}
          className="w-full "
          variant="secondary"
        >
          Subscribed
        </Button>
      ) : (
        <Button onClick={handleSubscribe} className="w-full " variant="outline">
          Subscribe
        </Button>
      )}
    </>
  );
}
