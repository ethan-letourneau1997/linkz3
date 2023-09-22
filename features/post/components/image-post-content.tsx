import { ImageCarousel } from "@/features/image-carousel";
import { Post } from "@/types";
import { fetchPostImages } from "@/lib/post/fetch-post-images";

type ImagePostContentProps = {
  post: Post;
};

export async function ImagePostContent({ post }: ImagePostContentProps) {
  const images = await fetchPostImages(post.id);

  return <ImageCarousel postImages={images || []} />;
}
