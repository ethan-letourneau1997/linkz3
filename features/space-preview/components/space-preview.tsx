import { Space } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

type SpacePreviewProps = {
  space: Space;
};

export function SpacePreview({ space }: SpacePreviewProps) {
  return (
    <div className="px-10 py-2 mt-5 border border-neutral-500">
      <Link
        className="font-semibold hover:underline"
        href={`/spaces/${space.name}`}
      >
        {space.name}
      </Link>
      <SpaceMemberCount space={space} />
    </div>
  );
}

type SpaceMemberCountProps = {
  space: Space;
};

export async function SpaceMemberCount({ space }: SpaceMemberCountProps) {
  const supabase = createServerComponentClient({ cookies });

  const { count } = await supabase
    .from("user_community")
    .select("*", { count: "exact", head: true })
    .eq("community_id", space.id);

  return <div>members: {count}</div>;
}
