import { CaptionImage } from "@/features/image-captions/components/caption-image";
import { CaptionInput } from "@/features/image-captions/components/caption-input";
import { PostRouterParams } from "@/types";
import { Separator } from "@/components/ui/separator";
import { fetchPostImages } from "@/lib/post/fetch-post-images";

type ImageEditorBodyProps = {
  params: PostRouterParams;
};

export async function ImageEditorBody({ params }: ImageEditorBodyProps) {
  const postImages = await fetchPostImages(params.postId as string);
  return (
    <div className="pb-5 space-y-10 mt-7">
      <Separator className="mb-4" />
      {postImages?.map((image, index) => (
        <>
          <div key={image.id} className="grid grid-cols-2 gap-5">
            <CaptionImage image={image} />
            <CaptionInput image={image} params={params} />
          </div>
          {index < postImages.length - 1 && <Separator className="mb-4" />}
        </>
      ))}
    </div>
  );
}
