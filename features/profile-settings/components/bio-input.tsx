"use client";

import { useState, useTransition } from "react";

import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { PublicProfile } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { upsertUserBio } from "../api/upsert-user-bio";
import { useToast } from "@/components/ui/use-toast";

type BioInputProps = {
  user: PublicProfile;
};

export function BioInput({ user }: BioInputProps) {
  const [bio, setBio] = useState(user.biography);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBio(e.target.value);
  }
  async function handleUpdateBio() {
    startTransition(async () => {
      try {
        const error = await upsertUserBio(user, bio);
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
    <>
      <Label className="mt-7" htmlFor="bio">
        Bio
      </Label>
      <Textarea
        className="dark:bg-dark-800"
        onChange={handleBioChange}
        id="bio"
        defaultValue={bio}
      />

      <div
        className={`flex justify-end ${
          bio === user.biography ? "invisible" : ""
        }`}
      >
        <LoadingButton
          disabled={bio === user.biography}
          className="mt-2"
          isLoading={isPending}
          onClick={handleUpdateBio}
          size="sm"
        >
          Save
        </LoadingButton>
      </div>
    </>
  );
}
