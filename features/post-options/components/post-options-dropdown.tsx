"use client";

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
import { Post, PostPreview } from "@/types";

import { ConfirmPostDelete } from "./confirm-post-delete";
import { EditPostButton } from "./edit-post-button";
import { useParams } from "next/navigation";
import { useState } from "react";

type PostOptionsMenuProps = {
  post: Post | PostPreview;
  disableRedirect?: boolean;
};

export function PostOptionsDropdown({
  post,
  disableRedirect,
}: PostOptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const params = useParams();

  return (
    <>
      <ConfirmPostDelete
        post={post}
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        disableRedirect={disableRedirect}
      />

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="bg-transparent border-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-transparent hover:bg-transparent dark:bg-transparent dark:border-none">
            <MoreHorizontal />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="py-0 ">
              <EditPostButton
                spaceId={params.spaceId as string}
                spaceName={params.spaceName as string}
                postId={post.id}
              />
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => setOpenAlert(true)}
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
