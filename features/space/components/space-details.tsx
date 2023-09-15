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

  return <div className="hidden mt-2 md:block">{space.description}</div>;
}
