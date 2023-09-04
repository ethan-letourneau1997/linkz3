import { Post } from "@/types";

import { getPreviewThumbnail } from "../api/get-preview-thumbnail";
import { HiOutlineLink } from "react-icons/hi";
import { RiText } from "react-icons/ri";

type PostPreviewThumbnailProps = {
  post: Post;
};

export async function PostPreviewThumbnail({
  post,
}: PostPreviewThumbnailProps) {
  if (post.type === "text")
    return (
      <div className="w-full h-full bg-neutral-800">
        <RiText className="h-full mx-auto my-auto text-xl" />
      </div>
    );

  const thumbnailUrl = await getPreviewThumbnail(post);

  return (
    <>
      {thumbnailUrl ? (
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      ) : (
        <div className="w-full h-full bg-neutral-800">
          <HiOutlineLink className="h-full mx-auto my-auto text-xl" />
        </div>
      )}
    </>
  );
}
