import { HiOutlineLink } from "react-icons/hi";
import Image from "next/image";
import { Post } from "@/types";
import { RiText } from "react-icons/ri";
import { getPreviewThumbnail } from "../api/get-preview-thumbnail";

type PostPreviewThumbnailProps = {
  post: Post;
};

export async function PostPreviewThumbnail({
  post,
}: PostPreviewThumbnailProps) {
  if (post.type === "text")
    return (
      <div className="w-full h-full rounded dark:bg-neutral-700">
        <RiText className="h-full mx-auto my-auto text-xl" />
      </div>
    );

  const thumbnailUrl = await getPreviewThumbnail(post);

  return (
    <>
      {thumbnailUrl ? (
        <div className="relative">
          <Image
            alt=""
            src={thumbnailUrl}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded dark:opacity-90"
          />
        </div>
      ) : (
        // <div
        //   className="w-full h-full rounded"
        //   style={{
        //     backgroundImage: `url(${thumbnailUrl})`,
        //     backgroundSize: "cover",
        //     backgroundPosition: "center",
        //     backgroundRepeat: "no-repeat",
        //   }}
        // >
        //   {post.type === "link" && (
        //     <div className="text-xs truncate">{post.content}</div>
        //   )}
        // </div>
        <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
          <HiOutlineLink />
        </div>
      )}
    </>
  );
}
