import { Post } from "@/types";
import { getPreviewThumbnail } from "@/features/post-preview/api/get-preview-thumbnail";

type LinkPostContentProps = {
  post: Post;
};

export async function LinkPostContent({ post }: LinkPostContentProps) {
  const linkPreview = await getPreviewThumbnail(post!);

  return <img className="w-1/4" alt="" src={linkPreview} />;
}
