import { fetchSpaceByName } from "@/lib/space/fetch-space-by-name";

type SpaceDetailsProps = {
  spaceName: string;
};

export async function SpaceDetails({ spaceName }: SpaceDetailsProps) {
  const space = await fetchSpaceByName(spaceName);

  return <div className="hidden mt-2 md:block">{space.description}</div>;
}
