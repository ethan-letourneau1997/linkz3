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
import { Post, PostPreview } from "@/types";
import { useState, useTransition } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";
import { LoadingButton } from "@/components/loading-button";
import { deletePost } from "../api/delete-post";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";

type PostOptionsMenuProps = {
  post: Post | PostPreview;
  disableRedirect?:boolean

};

export function PostOptions({ post, disableRedirect }: PostOptionsMenuProps) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isPending, startTransition] = useTransition();


  const router = useRouter()

  const { toast } = useToast();

  function handleDeletePost() {
    startTransition(async () => {
      const  data  = await deletePost(post);
      if(data){
        console.log(data)
      
      }
    

      toast({
        title: "Post Deleted",
        description: `Your post has been permanently deleted.`,
      });
      if(!disableRedirect) {
        router.back()
      }
      
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

      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="bg-transparent border-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-transparent hover:bg-transparent dark:bg-transparent dark:border-none"
       
          >
            <MoreHorizontal />
          </button>
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
