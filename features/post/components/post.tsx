import { Card } from "@/components/ui/card";
import { Comments } from "@/features/comments";
import { PostDetails } from "./post-details";
import { PostRouterParams } from "@/types";
import { RootCommentInput } from "./root-comment-input";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function Post({ params }: PostLayoutProps) {
  return (
    <div className="w-full max-w-3xl ">
      <PostDetails params={params} />
      <Card className="p-6 mt-2 border-0 rounded-none md:mt-5 md:border md:rounded">
        <div>
          <RootCommentInput params={params} />
        </div>
        <Separator className="my-10" />
        <Suspense fallback={<div>loading..</div>}>
          <Comments params={params} />
        </Suspense>
      </Card>
    </div>
  );
}
