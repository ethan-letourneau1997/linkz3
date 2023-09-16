"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useTransition } from "react";

import { Card } from "@/components/ui/card";
import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { LoadingButton } from "@/components/loading-button";
import { PostCommunityInput } from "./post-community-input";
import { PostLinkInput } from "./post-link-input";
import { PostTitleInput } from "./post-title-input";
import { SpaceRouterParams } from "@/types";
import { TextEditor } from "@/features/text-editor";
import { createPost } from "../api/create-post";
import { redirectToCaptions } from "../api/redirect-to-captions";
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

  async function handleCreateTextPost() {
    startTransition(async () => {
      await createPost({
        communityId: communityId,
        communityName: communityName,
        title: title,
        content: editorContent,
        type: "text",
      });
    });
  }

  async function handleCreateLinkPost() {
    startTransition(async () => {
      await createPost({
        communityId: communityId,
        communityName: communityName,
        title: title,
        content: link,
        type: "link",
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

  return (
    <Card className="w-full max-w-3xl p-5 mt-5 rounded-md ">
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
          <PostCommunityInput
            communityName={communityName}
            setCommunityName={setCommunityName}
            setCommunityId={setCommunityId}
          />
          <PostTitleInput setTitle={setTitle} title={title} />
          <TextEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />
          <div className="flex justify-end">
            <LoadingButton
              variant="outline"
              isLoading={isPending}
              onClick={handleCreateTextPost}
            >
              Submit
            </LoadingButton>
          </div>
        </TabsContent>
        <TabsContent className="py-3 space-y-5" value="link">
          <PostTitleInput setTitle={setTitle} title={title} />
          <PostLinkInput setLink={setLink} link={link} />

          <div className="flex justify-end">
            <LoadingButton
              variant="outline"
              isLoading={isPending}
              onClick={handleCreateLinkPost}
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
              variant="outline"
              isLoading={isPending}
              onClick={handleCreateImagePost}
            >
              upload images
            </LoadingButton>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
