"use server";

import { LinkPreview, Post } from "@/types";

import { getLinkPreview } from "link-preview-js";

export async function getLinkPreviewUrl(url: Post["content"]) {
  if (!url) return;

  const link: LinkPreview = await getLinkPreview(url);

  if (link.images && link.images[0]) {
    return link.images[0];
  }
}
