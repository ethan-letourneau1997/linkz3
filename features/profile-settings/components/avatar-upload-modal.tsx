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

type AvatarUploadModalProps = {
  user: PublicProfile;
};

export function AvatarUploadModal({ user }: AvatarUploadModalProps) {
  return (
    <div>
      <Dialog>
        <DialogTrigger>Update Avatar</DialogTrigger>
        <DialogContent className="h-screen max-w-3xl">
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>

            <UploadAvatar user={user} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
