"use client";

import { useState, useTransition } from "react";

import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { Space } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { upsertSpaceDescription } from "../api/upsert-space-description";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type SpaceDescriptionInputProps = {
  space: Space;
};

export function SpaceDescriptionInput({ space }: SpaceDescriptionInputProps) {
  const [description, setSpaceDescription] = useState(space.description);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

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
          router.refresh();
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
      <div className="flex justify-end w-20 pt-0.5">
        <Label className="flex-none ml-1 ">Description</Label>
      </div>

      <div className="flex items-end gap-4">
        <Textarea
          className="max-w-sm mt-1 dark:bg-dark-800"
          value={description}
          onChange={handleBioChange}
        />
        <div
          className={` ${description === space.description ? "invisible" : ""}`}
        >
          <LoadingButton
            disabled={description === space.description}
            className="mt-2"
            isLoading={isPending}
            onClick={handleUpdateBio}
            size="sm"
          >
            Update
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
