import { Subscriptions } from "@/features/subscriptions";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function HandleDisplaySubscriptions() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function getSpaces() {
    if (user) {
      try {
        const { data: spaces } = await supabase
          .from("user_subscription")
          .select()
          .eq("user_id", user.id);

        return spaces;
      } catch (e) {
        console.log(e);
      }
    }
  }

  const spaces = await getSpaces();

  if (spaces && spaces.length > 0) return <Subscriptions spaces={spaces} />;

  if (spaces && spaces.length === 0) return <div>No subscriptions!</div>;
}
