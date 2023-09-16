import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HandleUserSubscription } from "./handle-user-subscription";
import Link from "next/link";
import { UserSubscription } from "@/types";

type SubscriptionCardProps = {
  space: UserSubscription;
};

export async function SubscriptionCard({ space }: SubscriptionCardProps) {
  return (
    <Card key={space.community_id} className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <Link href={`spaces/${space.community_id}/${space.name}`}>{space.name}</Link>
     
        </CardTitle>
        <CardDescription>{space.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-end">
        <HandleUserSubscription space={space} />
      </CardFooter>
    </Card>
  );
}
