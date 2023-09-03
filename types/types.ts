import { Database } from "./supabase";

export type Space = Database["public"]["Tables"]["community"]["Row"];
export type Post = Database["public"]["Tables"]["post"]["Row"];
export type PostVote = Database["public"]["Tables"]["post_vote"]["Row"];
export type CommentVote = Database["public"]["Tables"]["comment_vote"]["Row"];
