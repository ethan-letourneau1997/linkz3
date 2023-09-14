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
import { Comment, PostRouterParams } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { LoadingButton } from "@/components/loading-button";
import { deleteComment } from "./delete-comment";
import { useToast } from "@/components/ui/use-toast";

type CommentOptionsMenuProps = {
  comment: Comment;
  params: PostRouterParams;
};

export function CommentOptionsMenu({
  comment,
  params,
}: CommentOptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  function handleDeleteComment() {
    startTransition(async () => {
      deleteComment(comment, params);

      toast({
        title: "Comment Deleted",
        description: `Your comment has been permanently deleted.`,
      });
    });
  }

  return (
    <>
      <AlertDialog open={openModal} onOpenChange={setOpenModal}>
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

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-transparent border-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-transparent hover:bg-transparent dark:bg-transparent dark:border-none"
            size="sm"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => setOpenModal(true)}
              className="text-red-600"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
