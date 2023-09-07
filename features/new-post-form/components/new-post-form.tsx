"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { PostLinkInput } from "./post-link-input";
import { PostTitleInput } from "./post-title-input";
import { SpaceRouterParams } from "@/types";
import { TextEditor } from "@/features/text-editor";
import { createPost } from "../api/create-post";
import { redirectToCaptions } from "../api/redirect-to-captions";
import { uploadImages } from "../api/upload-images";
import { useState } from "react";

type NewPostFormProps = {
  params: SpaceRouterParams;
};

export function NewPostForm({ params }: NewPostFormProps) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FilePondFile[]>([]);

  const { spaceId, spaceName } = params;

  async function handleCreateTextPost() {
    await createPost({
      communityId: spaceId,
      communityName: spaceName,
      title: title,
      content: editorContent,
      type: "text",
    });
  }

  async function handleCreateLinkPost() {
    await createPost({
      communityId: spaceId,
      communityName: spaceName,
      title: title,
      content: link,
      type: "link",
    });
  }

  async function handleCreateImagePost() {
    const postId = await createPost({
      communityId: spaceId,
      communityName: spaceName,
      title: title,
      type: "image",
    });

    await uploadImages(images as unknown as File[], postId);
    redirectToCaptions({
      communityName: spaceName,
      communityId: spaceId,
      postId,
    });
  }

  return (
    <>
      <div className="w-full max-w-3xl p-5 mt-5 rounded-md bg-neutral-900">
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
            <PostTitleInput setTitle={setTitle} title={title} />
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
            <button onClick={handleCreateTextPost}>Submit</button>
          </TabsContent>
          <TabsContent className="py-3 space-y-5" value="link">
            <PostTitleInput setTitle={setTitle} title={title} />
            <PostLinkInput setLink={setLink} link={link} />
            <button onClick={handleCreateLinkPost}>Submit</button>
          </TabsContent>
          <TabsContent className="py-3 space-y-5" value="image">
            <PostTitleInput setTitle={setTitle} title={title} />
            <ImageInput files={images} setFiles={setImages} />
            <button onClick={handleCreateImagePost}>upload images</button>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
