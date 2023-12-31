"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useState, useTransition } from "react";

import { Card } from "@/components/ui/card";
import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { LoadingButton } from "@/components/loading-button";
import { PostLinkInput } from "./post-link-input";
import { PostTextInput } from "./post-text-input";
import { PostTitleInput } from "./post-title-input";
import { SpaceRouterParams } from "@/types";
import { createPost } from "../api/create-post";
import { removeTags } from "@/lib/utils/remove-tags";
import { uploadImages } from "../api/upload-images";

type NewPostFormProps = {
  params: SpaceRouterParams;
};

export function NewPostForm({ params }: NewPostFormProps) {
  const { spaceId, spaceName } = params;
  const pathname = usePathname();
  const router = useRouter();

  // set initial tab
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  // set new search params
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FilePondFile[]>([]);
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState(type || "");

  const onTabChange = (value: string) => {
    setTab(value);
    router.push(pathname + "?" + createQueryString("type", value));
  };

  async function handleCreatePost(postType: string) {
    startTransition(async () => {
      if (postType === "image") {
        await createPost({
          communityId: spaceId,
          communityName: spaceName,
          title: title,
          content: undefined,
          type: postType,
        });
      }

      if (postType === "link") {
        await createPost({
          communityId: spaceId,
          communityName: spaceName,
          title: title,
          content: link,
          type: postType,
        });
      }

      if (postType === "text") {
        await createPost({
          communityId: spaceId,
          communityName: spaceName,
          title: title,
          content: editorContent,
          type: postType,
        });
      }
    });
  }

  async function handleCreateImagePost() {
    startTransition(async () => {
      const postId = await createPost({
        communityId: spaceId,
        communityName: spaceName,
        title: title,
        type: "image",
      });

      await uploadImages(images as unknown as File[], postId);
      redirect(`${pathname}/${postId}/captions`);
    });
  }

  const sanitizedText = removeTags(editorContent) || "";

  const isTextSubmitDisabled =
    !title || sanitizedText.length < 1 || !spaceId || !spaceName;
  const isLinkSubmitDisabled = !title || !link || !spaceId || !spaceName;
  const isImageSubmitDisabled =
    !title || images.length === 0 || !spaceId || !spaceName;

  return (
    <Card className="w-full max-w-3xl p-5 rounded-md w-3xl md:mt-5">
      <Tabs value={tab} onValueChange={onTabChange}>
        <TabsList className="w-full">
          <TabsTrigger className="w-1/3" value="text">
            Text
          </TabsTrigger>
          <TabsTrigger className="w-1/3" value="link">
            link
          </TabsTrigger>
          <TabsTrigger className="w-1/3" value="image">
            Image
          </TabsTrigger>
        </TabsList>
        <TabsContent value="text" className="py-3 space-y-5">
          <PostTitleInput setTitle={setTitle} title={title} />
          <PostTextInput
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
          <div className="flex justify-end">
            <LoadingButton
              size="sm"
              isLoading={isPending}
              onClick={() => handleCreatePost("text")}
              disabled={isTextSubmitDisabled}
            >
              Submit
            </LoadingButton>
          </div>
        </TabsContent>
        <TabsContent className="py-3 space-y-5 " value="link">
          <PostTitleInput setTitle={setTitle} title={title} />
          <PostLinkInput setLink={setLink} link={link} />
          <div className="flex justify-end">
            <LoadingButton
              size="sm"
              isLoading={isPending}
              onClick={() => handleCreatePost("link")}
              disabled={isLinkSubmitDisabled}
            >
              Submit
            </LoadingButton>
          </div>
        </TabsContent>
        <TabsContent className="py-3 space-y-5" value="image">
          <PostTitleInput setTitle={setTitle} title={title} />
          <ImageInput files={images} setFiles={setImages} />
          <div className="flex justify-end pt-2">
            <LoadingButton
              size="sm"
              isLoading={isPending}
              onClick={handleCreateImagePost}
              disabled={isImageSubmitDisabled}
            >
              upload images
            </LoadingButton>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
