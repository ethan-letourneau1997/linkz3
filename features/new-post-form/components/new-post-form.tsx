"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useTransition } from "react";

import { Card } from "@/components/ui/card";
import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { LoadingButton } from "@/components/loading-button";
import { PostCommunitySelect } from "./post-community-select";
import { PostLinkInput } from "./post-link-input";
import { PostTextInput } from "./post-text-input";
import { PostTitleInput } from "./post-title-input";
import { Separator } from "@/components/ui/separator";
import { SpaceRouterParams } from "@/types";
import { createPost } from "../api/create-post";
import { redirectToCaptions } from "../api/redirect-to-captions";
import { removeTags } from "@/lib/remove-tags";
import { uploadImages } from "../api/upload-images";

type NewPostFormProps = {
  params: SpaceRouterParams;
};

export function NewPostForm({ params }: NewPostFormProps) {
  const { spaceId, spaceName } = params;

  const [communityId, setCommunityId] = useState(spaceId);
  const [communityName, setCommunityName] = useState(spaceName);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FilePondFile[]>([]);
  const [isPending, startTransition] = useTransition();

  async function handleCreatePost(postType: string) {
    startTransition(async () => {
      const postContent = postType === "image" ? undefined : editorContent;

      await createPost({
        communityId: communityId,
        communityName: communityName,
        title: title,
        content: postContent,
        type: postType,
      });
    });
  }

  async function handleCreateImagePost() {
    startTransition(async () => {
      const postId = await createPost({
        communityId: communityId,
        communityName: communityName,
        title: title,
        type: "image",
      });

      await uploadImages(images as unknown as File[], postId);
      redirectToCaptions({
        communityName: communityName,
        communityId: communityId,
        postId,
      });
    });
  }

  const sanitizedText = removeTags(editorContent) || "";

  const isTextSubmitDisabled =
    !title || sanitizedText.length < 1 || !communityId || !communityName;
  const isLinkSubmitDisabled =
    !title || !link || !communityId || !communityName;
  const isImageSubmitDisabled =
    !title || images.length === 0 || !communityId || !communityName;

  return (
    <div className="w-full max-w-3xl mt-5 md:px-4">
      <div className="hidden px-2 md:block">
        <h1 className="text-xl font-medium">Create a post</h1>
        <Separator className="mt-2 " />
      </div>
      <Card className="p-5 rounded-md md:mt-5 ">
        <Tabs defaultValue="text" className="w-full max-w-3xl">
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
            <PostCommunitySelect
              communityName={communityName}
              setCommunityName={setCommunityName}
              setCommunityId={setCommunityId}
            />
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
          <TabsContent className="py-3 space-y-5" value="link">
            <PostCommunitySelect
              communityName={communityName}
              setCommunityName={setCommunityName}
              setCommunityId={setCommunityId}
            />
            <PostTitleInput setTitle={setTitle} title={title} />
            <PostLinkInput setLink={setLink} link={link} />
            <div className="flex justify-end">
              <LoadingButton
                size="sm"
                variant="outline"
                isLoading={isPending}
                onClick={() => handleCreatePost("link")}
                disabled={isLinkSubmitDisabled}
              >
                Submit
              </LoadingButton>
            </div>
          </TabsContent>
          <TabsContent className="py-3 space-y-5" value="image">
            <PostCommunitySelect
              communityName={communityName}
              setCommunityName={setCommunityName}
              setCommunityId={setCommunityId}
            />
            <PostTitleInput setTitle={setTitle} title={title} />
            <ImageInput files={images} setFiles={setImages} />
            <div className="flex justify-end pt-2">
              <LoadingButton
                size="sm"
                variant="outline"
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
    </div>
  );
}
