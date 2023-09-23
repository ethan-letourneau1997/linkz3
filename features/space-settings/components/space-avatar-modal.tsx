"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BiImageAdd } from "react-icons/bi";
import { SpaceAvatar } from "@/types";
import { UploadSpaceAvatar } from "./upload-space-avatar";
import { useState } from "react";

type SpaceAvatarUModalProps = {
  spaceAvatar?: SpaceAvatar;
  spaceId: string | number;
};

export function SpaceAvatarUModal({
  spaceAvatar,
  spaceId,
}: SpaceAvatarUModalProps) {
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
          <UploadSpaceAvatar
            spaceAvatar={spaceAvatar}
            spaceId={spaceId}
            close={closeModal}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
