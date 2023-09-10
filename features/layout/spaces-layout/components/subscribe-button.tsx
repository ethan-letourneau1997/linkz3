"use client";

import { Button } from "@/components/ui/button";
import { createSubscription } from "../api/create-subscriptions";
import { deleteSubscription } from "../api/delete-subscription";
import { useState } from "react";

type UserSubscriptionProps = {
  isSubscribed: boolean;
  spaceId: number;
};

export function SubscribeButton({
  isSubscribed,
  spaceId,
}: UserSubscriptionProps) {
  const [optomisticIsSubscribed, setOptomisticIsSubscribed] =
    useState(isSubscribed);

  function handleSubscribe() {
    setOptomisticIsSubscribed(true);
    createSubscription(spaceId);
  }

  function handleUnsubscribe() {
    setOptomisticIsSubscribed(false);
    deleteSubscription(spaceId);
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
