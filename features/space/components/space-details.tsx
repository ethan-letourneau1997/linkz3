import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type SpaceDetailsProps = {
  spaceName: string;
};

export async function SpaceDetails({ spaceName }: SpaceDetailsProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: space } = await supabase
    .from("community")
    .select()
    .eq("name", spaceName)
    .single();

  return <div className="mt-2">{space.description}</div>;
}
