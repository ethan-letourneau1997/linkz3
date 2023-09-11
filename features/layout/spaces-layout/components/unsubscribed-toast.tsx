"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type SubscribedToastProps = {
  spaceName: string;
};

export function UnsubscribedToast({ spaceName }: SubscribedToastProps) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Unsubscribed",
          description: `You are no longer a member of ${spaceName}.`,
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
