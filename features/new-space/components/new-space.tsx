"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/loading-button";
import { Textarea } from "@/components/ui/textarea";
import { createSpace } from "../api/create-space";

export function NewSpace() {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleCreateSpace() {
    startTransition(async () => {
      createSpace(spaceName, description);
    });
  }

  return (
    <Card className="w-full max-w-2xl mt-5 ">
      <CardHeader>
        <CardTitle>New Space</CardTitle>
  
      </CardHeader>
      <CardContent>
        <form className="space-y-5 ">
          <div className="space-y-1">
            <Label htmlFor="spaceName">Space Name</Label>
            <Input
              onChange={(e) => setSpaceName(e.target.value)}
              value={spaceName}
              type="spaceName"
              id="username"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
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
    </Card>
  );
}
