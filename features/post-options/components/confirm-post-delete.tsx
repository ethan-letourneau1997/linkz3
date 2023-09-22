"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Post, PostPreview } from "@/types";

import { LoadingButton } from "@/components/loading-button";
import { deletePost } from "../api/delete-post";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";

type ConfirmPostDeleteProps = {
  post: Post | PostPreview;
  openAlert: boolean;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  disableRedirect?: boolean;
};

export function ConfirmPostDelete({
  post,
  openAlert,
  setOpenAlert,
  disableRedirect,
}: ConfirmPostDeleteProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  function handleDeletePost() {
    startTransition(async () => {
      await deletePost(post);

      toast({
        title: "Post Deleted",
        description: `Your post has been permanently deleted.`,
      });

      if (!disableRedirect) {
        router.back();
      }
    });
  }

  return (
    <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-neutral-200">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:border-transparent dark:text-neutral-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-500 dark:text-neutral-50 dark:hover:bg-red-500/90"
            onClick={handleDeletePost}
          >
            <LoadingButton isLoading={isPending}>Delete</LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
