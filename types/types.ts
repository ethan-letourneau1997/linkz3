import { Database } from "./supabase";

export type Space = Database["public"]["Tables"]["community"]["Row"];
export type Post = Database["public"]["Tables"]["post"]["Row"];
