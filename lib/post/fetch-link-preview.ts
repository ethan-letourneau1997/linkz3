"use server";

import { LinkPreview } from "@/types";
import { getLinkPreview } from "link-preview-js";

export async function fetchLinkPreview(url: string) {
  try {
    const link: LinkPreview = await getLinkPreview(url);
    if(link){
      return link;
    }
    // if (link.images && link.images[0]) {
    //   const previewImage = link.images[0];
    //   return previewImage;
    // }
  } catch (e) {
    return null;
  }
}
