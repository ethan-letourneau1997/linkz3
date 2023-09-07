"use client";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Button, Modal, Tooltip } from "flowbite-react";
import { Post, PostRouterParams } from "@/types";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import Link from "next/link";
import { deletePost } from "../api/delete-post";
import { useState } from "react";

type PostOptionsProps = {
  post: Post;
  params: PostRouterParams;
};

export function PostOptions({ post, params }: PostOptionsProps) {
  return (
    <div className="flex gap-2">
      <Tooltip content="Delete Post" style="dark">
        <DeletePost post={post} params={params} />
      </Tooltip>
      <Tooltip content="Edit Post" style="dark">
        <Link href={`${post.id}/edit`}>
          <AiOutlineEdit className="text-xl" />
        </Link>
      </Tooltip>
    </div>
  );
}

type DeletePostProps = {
  post: Post;
  params: PostRouterParams;
};

export function DeletePost({ post, params }: DeletePostProps) {
  const [openModal, setOpenModal] = useState(false);

  function handleDeletePost() {
    deletePost(post, params.spaceName);
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>
        <AiOutlineDelete className="text-xl" />
      </button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 h-14 w-14 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
