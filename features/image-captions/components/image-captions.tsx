import { CaptionImage } from "./caption-image";
import { CaptionInput } from "./caption-input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
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

  return (
    <div className="w-full max-w-3xl sm:px-4">
      <Card className="p-6 mt-5 text-center bg-neutral-50">
        <h2 className="text-lg font-semibold sm:text-xl">
          Add captions to your images (optional).
        </h2>
        <Link
          className="text-xs text-blue-500 md:text-sm hover:cursor-pointer"
          href={`/spaces/${params.spaceId}/${params.spaceName}/post/${params.postId}`}
        >
          Continue to post
        </Link>
        <div className="mt-5 space-y-5">
          {post_images?.map((image) => (
            <div
              key={image.id}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <CaptionImage image={image} />
              <CaptionInput image={image} params={params} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
