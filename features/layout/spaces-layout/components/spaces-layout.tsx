import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HandleUserSubscription } from "./handle-user-subscription";
import { SpaceLink } from "@/components/links/space-link";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SpacesLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces } = await supabase.from("community").select();

  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
      {spaces?.map((space) => (
        <Card key={space.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>
              <SpaceLink
                spaceId={space.id}
                spaceName={space.name}
                text={space.name}
              />
            </CardTitle>
            <CardDescription>{space.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-end">
            <HandleUserSubscription space={space} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
