"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { PostLinkInput } from "../post-link-input";
import { PostTitleInput } from "../post-title-input";
import { TextEditor } from "@/features/text-editor";
import { useState } from "react";

export function NewPostForm() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [editorContent, setEditorContent] = useState("");
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
            <TabsTrigger className="w-1/3" value="images">
              Images
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="py-3 space-y-5">
            <PostTitleInput setTitle={setTitle} title={title} />
            <TextEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
          </TabsContent>
          <TabsContent className="py-3 space-y-5" value="link">
            <PostTitleInput setTitle={setTitle} title={title} />
            <PostLinkInput setLink={setLink} link={link} />
          </TabsContent>
          <TabsContent className="py-3 space-y-5" value="images">
            IMAGES
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
