"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PublicProfile } from "@/types";
import { UploadAvatar } from "./upload-avatar";
import { useState } from "react";
import { BiImageAdd } from "react-icons/bi";

type AvatarUploadModalProps = {
  user: PublicProfile;
};

export function AvatarUploadModal({ user }: AvatarUploadModalProps) {
  const [open, setOpen] = useState(false);

  function closeModal() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="relative opacity-50 -top-6 left-16 dark:text-neutral-200 hover:opacity-100">
        <BiImageAdd size={35} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Avatar Image to Upload</DialogTitle>
          <UploadAvatar user={user} close={closeModal} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
