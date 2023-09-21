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

import { Comment } from "@/types";
import { LoadingButton } from "@/components/loading-button";
import { deleteComment } from "../api/delete-comment";
import { useParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";

type ConfirmCommentDeleteProps = {
  comment: Comment;
  openAlert: boolean;
  setOpenAlert: (openAlert: boolean) => void;
};

export function ConfirmCommentDelete({
  comment,
  openAlert,
  setOpenAlert,
}: ConfirmCommentDeleteProps) {
  const [isPending, startTransition] = useTransition();

  const params = useParams();

  const { toast } = useToast();

  function handleDeleteComment() {
    startTransition(async () => {
      deleteComment(
        comment,
        params.spaceId as string,
        params.spaceName as string,
        params.postId as string
      );

      toast({
        title: "Comment Deleted",
        description: `Your comment has been permanently deleted.`,
      });
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
            This action cannot be undone and will permanently delete your
            comment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:border-transparent dark:text-neutral-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            asChild
            className="bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-500 dark:text-neutral-50 dark:hover:bg-red-500/90"
            onClick={handleDeleteComment}
          >
            <LoadingButton isLoading={isPending}>Delete</LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
