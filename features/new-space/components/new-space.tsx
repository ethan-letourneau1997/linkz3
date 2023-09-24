"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { NewSpaceForm } from "./new-space-form";

export function NewSpace() {
  return (
    <Card className="w-full max-w-2xl mt-5 ">
      <CardHeader>
        <CardTitle>New Space</CardTitle>
      </CardHeader>
      <NewSpaceForm />
    </Card>
  );
}
