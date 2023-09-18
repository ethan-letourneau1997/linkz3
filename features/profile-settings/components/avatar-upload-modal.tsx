"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { PublicProfile } from "@/types";
import { UploadAvatar } from "./upload-avatar";
import { useState } from "react";

type AvatarUploadModalProps = {
  user: PublicProfile;
};

export function AvatarUploadModal({ user }: AvatarUploadModalProps) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Update Avatar</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Avatar Image to Upload</DialogTitle>

            <UploadAvatar user={user} close={closeModal} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
