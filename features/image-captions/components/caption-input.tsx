"use client";

import { Button, Textarea } from "flowbite-react";
import { PostImage, PostRouterParams } from "@/types";

import { upsertImageCaption } from "../api/upsert-image-caption";
import { useState } from "react";

type CaptionInputProps = {
  image: PostImage;
  params: PostRouterParams;
};

export function CaptionInput({ image, params }: CaptionInputProps) {
  const [caption, setCaption] = useState(image.caption || "");

  function handleSubmitCaption() {
    upsertImageCaption({ image: image, newCaption: caption, params: params });
  }
  return (
    <div>
      <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} />
      <div className="flex justify-end mt-3">
        <Button
          onClick={handleSubmitCaption}
          disabled={caption === image.caption}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
