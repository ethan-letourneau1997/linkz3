"use client";

import { useState, useTransition } from "react";

import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { Space } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { upsertSpaceDescription } from "../api/upsert-space-description";
import { useToast } from "@/components/ui/use-toast";

type SpaceDescriptionInputProps = {
  space: Space;
};

export function SpaceDescriptionInput({ space }: SpaceDescriptionInputProps) {
  const [description, setSpaceDescription] = useState(space.description);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setSpaceDescription(e.target.value);
  }
  async function handleUpdateBio() {
    startTransition(async () => {
      try {
        const error = await upsertSpaceDescription(space, description!);
        if (error) {
          toast({
            title: "Error",
            description: `Something went wrong.`,
          });
        } else {
          toast({
            title: "Success",
            description: `Your bio has been updated.`,
          });
        }
      } catch (e) {
        toast({
          title: "Error",
          description: `Something went wrong.`,
        });
      }
    });
  }

  return (
    <div>
      <div className="flex gap-3 ">
        <div className="flex justify-end w-20 pt-0.5">
          <Label className="flex-none ml-1 ">Description</Label>
        </div>

        <Textarea
          className="max-w-sm ml-1 dark:bg-dark-700"
          value={description}
          onChange={handleBioChange}
        />
      </div>

      <div className="flex gap-3 mt-1">
        <div className="flex justify-end w-20 " />

        <div
          className={`flex justify-end  w-full max-w-sm  ${
            description === space.description ? "invisible" : ""
          }`}
        >
          <LoadingButton
            disabled={description === space.description}
            className="mt-2"
            isLoading={isPending}
            onClick={handleUpdateBio}
            size="sm"
          >
            Save
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
