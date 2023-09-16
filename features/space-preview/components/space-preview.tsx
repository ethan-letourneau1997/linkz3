import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HandleUserSubscription } from "./handle-user-subscription";
import Link from "next/link";
import { Space } from "@/types";

type SpacePreviewProps = {
  space: Space;
};

export async function SpacePreview({ space }: SpacePreviewProps) {
  return (
    <Card key={space.id} className="flex flex-col justify-between ">
      <CardHeader>
        <CardTitle>
          <Link href={`spaces/${space.id}/${space.name}`}>{space.name}</Link>
        </CardTitle>
        <CardDescription>{space.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex items-end">
        <HandleUserSubscription space={space} />
      </CardFooter>
    </Card>
  );
}
