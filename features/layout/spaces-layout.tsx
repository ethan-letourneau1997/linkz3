import { SpacePreview } from "../space-preview/components/space-preview";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SpacesLayout() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces } = await supabase.from("community").select();

  return (
    <div className="w-full max-w-3xl">
      <h1 className="mt-5 text-3xl font-medium text-center">Spaces</h1>
      {spaces?.map((space) => <SpacePreview key={space.id} space={space} />)}
    </div>
  );
}
