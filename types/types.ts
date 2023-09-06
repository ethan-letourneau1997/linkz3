import { Database } from "./supabase";

export type Space = Database["public"]["Tables"]["community"]["Row"];
export type Post = Database["public"]["Tables"]["post"]["Row"];
export type PostVote = Database["public"]["Tables"]["post_vote"]["Row"];
export type CommentVote = Database["public"]["Tables"]["comment_vote"]["Row"];
export type PostImage = Database["public"]["Tables"]["post_image"]["Row"];
export type Comment = Database["public"]["Tables"]["comment"]["Row"];
export type PostWithVotes =
  Database["public"]["Views"]["post_with_votes"]["Row"];

export type LinkPreview = {
  url: string;
  title?: string;
  siteName?: string;
  description?: string;
  mediaType: string;
  contentType?: string;
  images?: string[];
  videos?: {
    /* specify the video properties here */
  }[];
  favicons: string[];
};

export type SpaceRouterParams = {
  spaceName: string;
  spaceId: string;
};
export type PostRouterParams = {
  spaceName: string;
  spaceId: string;
  postId: string;
};
