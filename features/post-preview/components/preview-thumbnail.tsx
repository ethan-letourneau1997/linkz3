import { LinkPreview, Post, PostPreview } from "@/types";

import { BiLinkExternal } from "react-icons/bi";
import { HiOutlineLink } from "react-icons/hi";
import { RiText } from "react-icons/ri";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getLinkPreview } from "link-preview-js";

type PreviewThumbnailProps = {
  post: Post | PostPreview;
};

export async function PreviewThumbnail({ post }: PreviewThumbnailProps) {
  if (post.type === "text") return <TextPreviewThumnail />;
  // if (post.type === "image") return <TextPreviewThumnail />;
  // if (post.type === "link") return <TextPreviewThumnail />;

  if (post.type === "link" && post.content) {
    const link: LinkPreview = await getLinkPreview(post.content);

    if (link.images && link.images[0]) {
      return (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={post.content}
          className="flex flex-col justify-between w-full h-full rounded "
          style={{
            backgroundImage: `url(${link.images && link.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-end pt-0.5 pr-0.5">
            <BiLinkExternal />
          </div>

          <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
            {link.siteName}
          </div>
        </a>
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      );
    }
  }

  if (post.type === "image") {
    const supabase = createServerComponentClient({ cookies });

    const { data: post_image } = await supabase
      .from("post_image")
      .select()
      .eq("post_id", post.id)
      .limit(1)
      .single();

    if (post_image) {
      return (
        <div
          className="w-full h-full rounded"
          style={{
            backgroundImage: `url(${post_image.url})`,
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
