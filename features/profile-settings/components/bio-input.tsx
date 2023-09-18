"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublicProfile } from "@/types";
import { useState } from "react";

type BioInputProps = {
  user: PublicProfile;
};

export function BioInput({ user }: BioInputProps) {
  const [bio, setBio] = useState(user.biography);

  function handleBioChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBio(e.target.value);
  }

  return (
    <>
      <div>{bio}</div>
      <Label className="mt-7" htmlFor="bio">
        Bio
      </Label>
      <Textarea onChange={handleBioChange} id="bio" defaultValue={bio} />
    </>
  );
}
