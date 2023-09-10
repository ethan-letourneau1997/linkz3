"use server";

import { LinkPreview } from "@/types";
import { getLinkPreview } from "link-preview-js";

export async function fetchLinkPreview(content: string) {
  try {
    const link: LinkPreview | null = await getLinkPreview(content);
    return link;
  } catch (error) {
    return null;
  }
}
