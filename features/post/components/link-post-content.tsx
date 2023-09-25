import { Post } from "@/types";
import { getPreviewThumbnail } from "@/features/post-previews/api/get-preview-thumbnail";

type LinkPostContentProps = {
  post: Post;
};

export async function LinkPostContent({ post }: LinkPostContentProps) {
  const linkPreview = await getPreviewThumbnail(post!);

  if (linkPreview)
    return (
      <div className="mb-2">
        <img className="w-1/4 rounded" alt="" src={linkPreview} />
      </div>
    );
}
