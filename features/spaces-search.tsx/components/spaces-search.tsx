import { SpacesSearchbar } from "./spaces-searchbar";
import { fetchAllSpaces } from "@/lib/space/fetch-all-spaces";

export async function SpacesSearch() {
  const spaces = await fetchAllSpaces();

  if (spaces) return <SpacesSearchbar spaces={spaces} />;
}
