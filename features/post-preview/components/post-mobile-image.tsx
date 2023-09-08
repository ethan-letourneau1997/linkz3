import { Post } from "@/types";
import { getPreviewThumbnail } from "../api/get-preview-thumbnail";

type PostMobileImageProps = {
  post: Post;
};

export async function PostMobileImage({ post }: PostMobileImageProps) {
  const thumbnailUrl = await getPreviewThumbnail(post);

  return (
    <>
      <img className="rounded-md opacity-90" src={thumbnailUrl} />
    </>
  );
}
