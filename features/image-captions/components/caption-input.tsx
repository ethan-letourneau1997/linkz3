"use client";

import { PostImage, PostRouterParams } from "@/types";
import { useState, useTransition } from "react";

import { LoadingButton } from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { upsertImageCaption } from "../api/upsert-image-caption";
import { useToast } from "@/components/ui/use-toast";

type CaptionInputProps = {
  image: PostImage;
  params: PostRouterParams;
};

export function CaptionInput({ image, params }: CaptionInputProps) {
  const [caption, setCaption] = useState(image.caption || "");

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleSubmitCaption() {
    startTransition(async () => {
      upsertImageCaption({ image: image, newCaption: caption, params: params });
      toast({
        title: "Caption Updated",
        description: `Your changes have been saved!.`,
      });
    });
  }
  return (
    <div className="mb-5 md:mb-0">
      <Textarea
        className="dark:bg-dark-800"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div className="flex justify-end mt-3">
        <LoadingButton
          size="sm"
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
