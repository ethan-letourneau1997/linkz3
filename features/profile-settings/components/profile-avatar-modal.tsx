"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BiImageAdd } from "react-icons/bi";
import { ProfileAvatar } from "@/types";
import { UploadProfileAvatar } from "./upload-profile-avatar";
import { useState } from "react";

type ProfileAvatarUModalProps = {
  profileAvatar?: ProfileAvatar;
  userId: string | number;
};

export function ProfileAvatarModal({
  profileAvatar,
  userId,
}: ProfileAvatarUModalProps) {
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
          <UploadProfileAvatar
            profileAvatar={profileAvatar}
            userId={userId}
            close={closeModal}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
