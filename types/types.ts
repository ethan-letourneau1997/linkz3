import { Database } from "./supabase";

export type Space = Database["public"]["Tables"]["community"]["Row"];
