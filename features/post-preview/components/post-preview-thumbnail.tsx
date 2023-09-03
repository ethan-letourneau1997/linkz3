import { Post } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getPreviewThumbnail } from "../api/get-preview-thumbnail";

type PostPreviewThumbnailProps = {
  post: Post;
};

export async function PostPreviewThumbnail({
  post,
}: PostPreviewThumbnailProps) {
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
        <Skeleton className="w-full h-full" />
      )}
    </>
  );
}
