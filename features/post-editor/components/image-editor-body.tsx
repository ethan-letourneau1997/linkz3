import { CaptionInput } from "@/features/image-captions/components/caption-input";
import { ImageDisplay } from "@/features/image-captions/components/image-display";
import { PostRouterParams } from "@/types";
import { Separator } from "@/components/ui/separator";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type ImageEditorBodyProps = {
  params: PostRouterParams;
};

export async function ImageEditorBody({ params }: ImageEditorBodyProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: post_images } = await supabase
    .from("post_image")
    .select()
    .eq("post_id", params.postId)
    .order("priority", { ascending: true });

  return (
    <div className="pb-5 space-y-10 mt-7">
      <Separator className="mb-4" />
      {post_images?.map((image, index) => (
        <>
          <div key={image.id} className="grid grid-cols-2 gap-5">
            <ImageDisplay image={image} />
            <CaptionInput image={image} params={params} />
          </div>
          {index < post_images.length - 1 && <Separator className="mb-4" />}
        </>
      ))}
    </div>
  );
}
