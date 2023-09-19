import { SpacesSearchbar } from "./spaces-searchbar";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function SpacesSearch() {
  const supabase = createServerComponentClient({ cookies });
  const { data: spaces } = await supabase.from("community").select("*");

  if (spaces) return <SpacesSearchbar spaces={spaces} />;
}
