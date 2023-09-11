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
import { Post, PostRouterParams } from "@/types";

import { AiOutlineEdit } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deletePost } from "../api/delete-post";
import { useState } from "react";

type PostOptionsMenuProps = {
  post: Post;
  params: PostRouterParams;
};

export function PostOptionsMenu({ post, params }: PostOptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  function handleDeletePost() {
    deletePost(post, params.spaceName);
    setOpenModal(false);
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="dark:border-transparent dark:text-neutral-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-500 dark:text-neutral-50 dark:hover:bg-red-500/90"
              onClick={handleDeletePost}
            >
              Delete
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
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="py-0 ">
              <Link
                className="w-full  py-1.5 flex gap-1"
                href={`${post.id}/edit`}
              >
                <AiOutlineEdit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>

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
