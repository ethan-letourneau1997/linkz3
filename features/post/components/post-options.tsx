"use client";

import { Button, Modal } from "flowbite-react";
import { Post, PostRouterParams } from "@/types";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { deletePost } from "../api/delete-post";
import { useState } from "react";

type PostOptionsProps = {
  post: Post;
  params: PostRouterParams;
};

export function PostOptions({ post, params }: PostOptionsProps) {
  return (
    <>
      <DeletePost post={post} params={params} />
    </>
  );
}

type DeletePostProps = {
  post: Post;
  params: PostRouterParams;
};

export function DeletePost({ post, params }: DeletePostProps) {
  const [openModal, setOpenModal] = useState<string | undefined>();

  function handleDeletePost() {
    deletePost(post, params.spaceName);
    setOpenModal(undefined);
  }

  return (
    <>
      <Button onClick={() => setOpenModal("pop-up")}>Toggle modal</Button>
      <Modal
        show={openModal === "pop-up"}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
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
              <Button color="gray" onClick={() => setOpenModal(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
