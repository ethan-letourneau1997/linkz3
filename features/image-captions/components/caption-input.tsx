"use client";

import { PostImage, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { LoadingButton } from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { upsertImageCaption } from "../api/upsert-image-caption";

type CaptionInputProps = {
  image: PostImage;
  params: PostRouterParams;
};

export function CaptionInput({ image, params }: CaptionInputProps) {
  const [caption, setCaption] = useState(image.caption || "");

  const [isPending, startTransition] = useTransition();

  function handleSubmitCaption() {
    startTransition(async () => {
      upsertImageCaption({ image: image, newCaption: caption, params: params });
    });
  }
  return (
    <div>
      <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} />
      <div className="flex justify-end mt-3">
        <LoadingButton
          onClick={handleSubmitCaption}
          disabled={caption === image.caption}
          isLoading={isPending}
        >
          Save
        </LoadingButton>
      </div>
    </div>
  );
}
