"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Comment } from "@/types";
import { ConfirmCommentDelete } from "./confirm-comment-delete";
import { useState } from "react";

type CommentOptionsDropdownProps = {
  comment: Comment;
};

export function CommentOptionsDropdown({
  comment,
}: CommentOptionsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <>
      <ConfirmCommentDelete
        comment={comment}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
      />

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
              onClick={() => setOpenAlert(true)}
              className="text-red-600"
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
