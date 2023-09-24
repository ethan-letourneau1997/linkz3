"use client";

import { useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { Space } from "@/types";
import { upsertSpaceDisplayName } from "../api/upsert-space-display-name";
import { useToast } from "@/components/ui/use-toast";

type DisplayNameInputProps = {
  space: Space;
};

export function DisplayNameInput({ space }: DisplayNameInputProps) {
  const [displayName, setDisplayName] = useState(space.display_name);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();
  function handleDisplayNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDisplayName(e.target.value);
  }
  async function handleUpdateBio() {
    startTransition(async () => {
      try {
        const error = await upsertSpaceDisplayName(space, displayName!);
        if (error) {
          toast({
            title: "Error",
            description: `Something went wrong.`,
          });
        } else {
          toast({
            title: "Success",
            description: `Space display name has been updated.`,
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
      <Label className="flex-none ml-1 ">Display Name</Label>
      <div className="flex items-center gap-4 mt-1">
        <Input
          className="max-w-sm dark:bg-dark-800 "
          value={displayName}
          onChange={handleDisplayNameChange}
        />
        <div
          className={` ${
            displayName === space.display_name ? "invisible" : ""
          }`}
        >
          <LoadingButton
            disabled={displayName === space.display_name}
            isLoading={isPending}
            onClick={handleUpdateBio}
            size="sm"
            className="h-9"
          >
            Update
          </LoadingButton>
        </div>
      </div>
    </div>
  );
}
