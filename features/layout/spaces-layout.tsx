import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Space } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SpacesLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces } = await supabase.from("community").select();

  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-5 mt-5">
      {spaces?.map((space) => (
        <Card key={space.id} className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>{space.name}</CardTitle>
            <CardDescription>{space.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <p>
              <SpaceMemberCount space={space} />
            </p> */}
          </CardContent>
          <CardFooter className="flex items-end">
            <UserSubscription space={space} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

type UserSubscriptionProps = {
  space: Space;
};

export async function UserSubscription({ space }: UserSubscriptionProps) {
  const supabase = createServerComponentClient({ cookies });

  // data.session?.user.id

  const { data } = await supabase.auth.getSession();

  async function checkUserSubscription() {
    if (data.session) {
      try {
        const { data: user_community } = await supabase
          .from("user_community")
          .select()
          .match({ user_id: data.session.user.id, community_id: space.id });

        if (user_community && user_community.length > 0) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const isSubscribed = await checkUserSubscription();

  if (isSubscribed) {
    return (
      <Button className="w-full " variant="secondary">
        Subscribed
      </Button>
    );
  }

  return (
    <Button className="w-full " variant="outline">
      Subscribe
    </Button>
  );
}
