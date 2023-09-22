import { SpacePreview } from "@/features/space-preview";
import { fetchAllSpaces } from "@/lib/space/fetch-all-spaces";

export async function Spaces() {
  const spaces = await fetchAllSpaces();

  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
      {spaces?.map((space) => <SpacePreview key={space.id} space={space} />)}
    </div>
  );
}
