import { SpacePreview } from "../space-preview/components/space-preview";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SpacesLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces } = await supabase.from("community").select();

  return (
    <>
      <div className="mt-5 text-3xl font-medium">Spaces</div>
      {spaces?.map((space) => <SpacePreview key={space.id} space={space} />)}
    </>
  );
}
