"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FilePondFile } from "filepond";
import { ImageInput } from "./image-input";
import { PostLinkInput } from "./post-link-input";
import { PostTitleInput } from "./post-title-input";
import { SpaceRouterParams } from "@/types";
import { TextEditor } from "@/features/text-editor";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createPost } from "../api/create-post";
import { redirectToCaptions } from "../api/redirect-to-captions";
import { uploadImages } from "../api/upload-images";
import useSWR from "swr";

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

  async function handleCreateTextPost() {
    await createPost({
      communityId: communityId,
      communityName: communityName,
      title: title,
      content: editorContent,
      type: "text",
    });
  }

  async function handleCreateLinkPost() {
    await createPost({
      communityId: communityId,
      communityName: communityName,
      title: title,
      content: link,
      type: "link",
    });
  }

  async function handleCreateImagePost() {
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

type PostCommunityInputProps = {
  setCommunityName: (communityName: string) => void;
  communityName: string;
  setCommunityId: Dispatch<SetStateAction<string>>;
};

export function PostCommunityInput({
  setCommunityName,
  communityName,
  setCommunityId,
}: PostCommunityInputProps) {
  const supabase = createClientComponentClient();

  const { data: communities } = useSWR("community", async () => {
    const { data: posts, error } = await supabase.from("community").select("*");

    if (error) throw error.message;
    return posts;
  });

  const handleCommunityChange = (value: string | null) => {
    if (value) {
      const community = communities?.find((c) => c.name === value);

      if (community) {
        setCommunityId(community.id);
        setCommunityName(community.name);
      }
    } else {
      setCommunityId("");
      setCommunityName("");
    }
  };

  return (
    <div className="space-y-1">
      <label>Community</label>
      <Select value={communityName} onValueChange={handleCommunityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {communities &&
            communities.map((community) => (
              <SelectItem key={community.id} value={community.name}>
                {community.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <input
        onChange={(e) => setCommunityName(e.target.value)}
        value={communityName}
        type="text"
        className="w-full h-8 border bg-neutral-900 border-neutral-700"
      />
    </div>
  );
}
