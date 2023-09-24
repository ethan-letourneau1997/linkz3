"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { ChangeEvent, useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { createSpace } from "../api/create-space";

export function NewSpaceForm() {
  const [spaceName, setSpaceName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(true);
  const [isPending, startTransition] = useTransition();

  async function handleCreateSpace() {
    startTransition(async () => {
      if (checked) {
        createSpace(spaceName, description);
      } else {
        createSpace(spaceName, description, displayName);
      }
    });
  }

  async function handleSpaceNameChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value.includes(" ")) {
      // If no spaces found, update the state
      setSpaceName(event.target.value);
    }
  }

  return (
    <>
      <CardContent>
        <form className="space-y-5 ">
          <div className="space-y-1">
            <Label htmlFor="spaceName" className="dark:text-neutral-300">
              Space Name
            </Label>
            <Input
              onChange={(e) => handleSpaceNameChange(e)}
              value={spaceName}
              type="spaceName"
              id="username"
              className="h-9 dark:bg-dark-800"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="spaceName" className="dark:text-neutral-300">
              Display Name
            </Label>
            <Input
              disabled={checked}
              onChange={(e) => setDisplayName(e.target.value)}
              value={checked ? spaceName : displayName}
              type="spaceName"
              id="username"
              className="h-9 dark:bg-dark-800"
            />
            <div className="flex items-center pt-1 ml-1 space-x-2">
              <Checkbox
                checked={checked}
                id="terms"
                onClick={() => setChecked(!checked)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Same as Space Name
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="dark:text-neutral-300" htmlFor="description">
              Description
            </Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              className="dark:bg-dark-800"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end ">
        <LoadingButton
          isLoading={isPending}
          onClick={handleCreateSpace}
          variant="outline"
          disabled={spaceName.length < 5}
        >
          Create
        </LoadingButton>
      </CardFooter>
    </>
  );
}
