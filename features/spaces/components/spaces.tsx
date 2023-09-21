import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { SpacePreview } from "@/features/space-preview";

export async function Spaces() {
  const supabase = createServerComponentClient({ cookies });

  const { data: spaces } = await supabase.from("community").select();

  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
      {spaces?.map((space) => <SpacePreview key={space.id} space={space} />)}
    </div>
  );
}