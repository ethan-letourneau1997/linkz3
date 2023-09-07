import { CaptionInput } from "./caption-input";
import { ImageDisplay } from "./image-display";
import { PostRouterParams } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

type ImageCaptionsProps = {
  params: PostRouterParams;
};

export async function ImageCaptions({ params }: ImageCaptionsProps) {
  const supabase = createServerComponentClient({ cookies });
  const { data: post_images } = await supabase
    .from("post_image")
    .select()
    .eq("post_id", params.postId)
    .order("priority", { ascending: true });

  console.log(post_images);

  return (
    <div className="w-full max-w-2xl mt-5">
      <h2 className="text-xl font-semibold text-center">
        Add captions to your images (optional).
      </h2>
      <div className="mt-5 space-y-5">
        {post_images?.map((image) => (
          <div key={image.id} className="grid grid-cols-2 gap-5">
            <ImageDisplay image={image} />
            <CaptionInput image={image} params={params} />
          </div>
        ))}
      </div>
    </div>
  );
}
