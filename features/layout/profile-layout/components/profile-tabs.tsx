"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProfileTabsProps = {
  posts: JSX.Element;
  comments: JSX.Element;
};

export function ProfileTabs({ posts, comments }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger className="w-1/2" value="posts">
          Posts
        </TabsTrigger>
        <TabsTrigger className="w-1/2" value="comments">
          Comments
        </TabsTrigger>
      </TabsList>
      <TabsContent value="posts">{posts}</TabsContent>
      <TabsContent value="comments">{comments}</TabsContent>
    </Tabs>
  );
}
