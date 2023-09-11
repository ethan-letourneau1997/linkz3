"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type SubscribedToastProps = {
  spaceName: string;
};

export function SubscribedToast({ spaceName }: SubscribedToastProps) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Subscribed",
          description: `You are now a member of ${spaceName}.`,
        });
      }}
    >
      Add to calendar
    </Button>
  );
}
