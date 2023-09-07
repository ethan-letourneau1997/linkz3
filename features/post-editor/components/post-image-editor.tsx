import { ImageEditorBody } from "./image-editor-body";
import { ImageEditorHeader } from "./image-editor-header";
import { PostRouterParams } from "@/types";

type ImageCaptionsProps = {
  params: PostRouterParams;
};

export async function PostImageEditor({ params }: ImageCaptionsProps) {
  return (
    <div className="w-full max-w-2xl mt-5 text-center">
      <ImageEditorHeader params={params} />
      <ImageEditorBody params={params} />
    </div>
  );
}
