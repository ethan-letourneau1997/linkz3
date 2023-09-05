"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { PostLinkInput } from "./post-link-input";
import { PostTitleInput } from "./post-title-input";
import { TextEditor } from "@/features/text-editor";
import { createPost } from "../api/create-post";
import { uploadImages } from "../api/upload-images";
import { useState } from "react";

export function NewPostForm() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [images, setImages] = useState<FilePondFile[]>([]);

  function handleCreateTextPost() {
    createPost("Webdev", "text", title, editorContent);
  }

  function handleCreateLinkPost() {
    createPost("Webdev", "link", title, link);
  }

  async function handleCreateImagePost() {
    const postId = await createPost("Webdev", "image", title);

    await uploadImages(images as unknown as File[], postId);
  }

  return (
    <>
      <div className="w-full max-w-3xl p-5 mt-5 rounded-md bg-neutral-900">
        <Tabs defaultValue="image" className="w-full max-w-3xl">
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
            <button
              onClick={handleCreateImagePost}
              // onClick={uploadPostImages}
            >
              upload images
            </button>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
