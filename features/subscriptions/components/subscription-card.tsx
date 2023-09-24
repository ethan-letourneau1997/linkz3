import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HandleSubscriptionButtons } from "./handle-subscription-buttons";
import Link from "next/link";
import { Space } from "@/types";

type SubscriptionCardProps = {
  space: Space;
};

export async function SubscriptionCard({ space }: SubscriptionCardProps) {
  return (
    <Card key={space.id} className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>
          <Link href={`spaces/${space.id}/${space.name}`}>{space.name}</Link>
        </CardTitle>
        <CardDescription>{space.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-end">
        <HandleSubscriptionButtons space={space} />
      </CardFooter>
    </Card>
  );
}
