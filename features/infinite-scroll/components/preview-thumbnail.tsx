"use client";

import { LinkPreview, PostPreview } from "@/types";
import { useEffect, useState } from "react";

import { HiOutlineLink } from "react-icons/hi";
import { RiText } from "react-icons/ri";
import { fetchLinkPreview } from "../api/get-link-preview";
import { getPostPreviewImageUrl } from "../api/get-post-preview-image-url";

type PreviewThumbnailProps = {
  post: PostPreview;
};

export function PreviewThumbnail({ post }: PreviewThumbnailProps) {
  return (
    <>
      {post.type === "link" && <LinkPreviewThumbnail post={post} />}
      {post.type === "image" && <ImagePreviewThumbnail post={post} />}
      {post.type === "text" && <TextPreviewThumnail />}
    </>
  );
}

type LinkPreviewThumbnailProps = {
  post: PostPreview;
};

export function LinkPreviewThumbnail({ post }: LinkPreviewThumbnailProps) {
  const [linkPreview, setLinkPreview] = useState<LinkPreview | null>(null);

  useEffect(() => {
    async function getLink() {
      if (post.content) {
        try {
          const link: LinkPreview | null = await fetchLinkPreview(post.content);

          if (link && link.images && link.images[0]) {
            setLinkPreview(link);
          }
        } catch (e) {
          return null;
        }
      }
    }
    getLink();
  }, [post]);

  if (linkPreview) {
    return (
      <div
        className="flex items-end w-full h-full rounded "
        style={{
          backgroundImage: `url(${
            linkPreview.images && linkPreview.images[0]
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full text-xs text-center truncate rounded-b dark:bg-neutral-900/70 dark:text-neutral-400">
          {linkPreview.siteName}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center w-full h-full rounded dark:bg-neutral-700 ">
        <HiOutlineLink />
      </div>
    );
  }
}

export function TextPreviewThumnail() {
  return (
    <div className="w-full h-full rounded dark:bg-neutral-700">
      <RiText className="h-full mx-auto my-auto text-xl" />
    </div>
  );
}

type ImagePreviewThumbnailProps = {
  post: PostPreview;
};

export function ImagePreviewThumbnail({ post }: ImagePreviewThumbnailProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    async function GetPreviewImageUrl() {
      if (post.id) {
        try {
          const imageUrl = await getPostPreviewImageUrl(post.id);

          setPreviewImage(imageUrl);
        } catch (e) {
          console.log(e);
        }
      }
    }
    GetPreviewImageUrl();
  }, [post]);

  if (previewImage)
    return (
      <div
        className="w-full h-full rounded"
        style={{
          backgroundImage: `url(${previewImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    );
}
