import { SupabaseClient } from "@supabase/supabase-js";

export function getUserSpacesbyId(client: SupabaseClient, userId: number) {
  return client
    .from("user_community")
    .select("*, community_id(*)")
    .eq("user_id", userId)
    .throwOnError()
    .single();
}
