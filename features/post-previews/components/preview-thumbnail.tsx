import { LinkPreview, Post, PostPreview } from "@/types";

import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineLink } from "react-icons/hi";
import { RiText } from "react-icons/ri";
import { fetchPostImagePreview } from "../api/fetch-post-image-preview";
import { getLinkPreview } from "link-preview-js";

type PreviewThumbnailProps = {
  post: Post | PostPreview;
};

export async function PreviewThumbnail({ post }: PreviewThumbnailProps) {
  if (post.type === "text") return <TextPreviewThumnail />;
  // if (post.type === "image") return <TextPreviewThumnail />;

  if (post.type === "link" && post.content) {
    try {
      const link: LinkPreview = await getLinkPreview(post.content);
      if (link.images && link.images[0]) {
        const linkPreview = link.images[0];
        return <img src={linkPreview} />;
      }
    } catch (e) {
      return (
        <img src="https://dims.apnews.com/dims4/default/9a6c86e/2147483647/strip/true/crop/5412x3044+0+543/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0b%2Fab%2F4a930117f7629379bc020c15e35e%2F9e010ee35b244e4aa5d72ab468b9abee" />
      );
    }
  }

  if (post.type === "link" && post.content) {
    try {
      const link: LinkPreview = await getLinkPreview(post.content);
      if (link.images && link.images[0]) {
        return (
          <img src="https://dims.apnews.com/dims4/default/9a6c86e/2147483647/strip/true/crop/5412x3044+0+543/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0b%2Fab%2F4a930117f7629379bc020c15e35e%2F9e010ee35b244e4aa5d72ab468b9abee" />
          // <a
          //   target="_blank"
          //   rel="noopener noreferrer"
          //   href={post.content}
          //   className="flex flex-col justify-between w-full h-full rounded "
          //   style={{
          //     // backgroundImage: `url(${link.images && link.images[0]})`,
          //     backgroundImage: `url(https://dims.apnews.com/dims4/default/9a6c86e/2147483647/strip/true/crop/5412x3044+0+543/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0b%2Fab%2F4a930117f7629379bc020c15e35e%2F9e010ee35b244e4aa5d72ab468b9abee)`,
          //     backgroundSize: "cover",
          //     backgroundPosition: "center",
          //     backgroundRepeat: "no-repeat",
          //   }}
          // >
          //   <div className="flex justify-end pt-0.5 pr-0.5">
          //     <BiLinkExternal />
          //   </div>

          //   <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
          //     {link.siteName}
          //   </div>
          // </a>
        );
      } else {
        return (
          <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
            <HiOutlineLink />
          </div>
        );
      }
    } catch (e) {
      return (
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      );
    }
  }

  if (post.type === "image") {
    const image = await fetchPostImagePreview(post.id);

    if (image) {
      return (
        <div
          className="w-full h-full rounded"
          style={{
            backgroundImage: `url(${image.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      );
    }
  }
}

function TextPreviewThumnail() {
  return (
    <div className="w-full h-full rounded dark:bg-neutral-700">
      <RiText className="h-full mx-auto my-auto text-xl" />
    </div>
  );
}
