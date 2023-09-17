import { Card } from "@/components/ui/card";
import { Comments } from "@/features/comments";
import { Post } from "@/features/post";
import { PostRouterParams } from "@/types";
import { RootCommentInput } from "./root-comment-input";
import { Separator } from "@/components/ui/separator";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function PostLayout({ params }: PostLayoutProps) {
  return (
    <div className="w-full max-w-3xl ">
      <Post params={params} />

      <Card className="p-6 mt-2 border-0 rounded-none md:mt-5 md:border md:rounded">
        <div>
          <RootCommentInput params={params} />
        </div>
        <Separator className="my-10" />
        <Comments params={params} />
      </Card>
    </div>
  );
}
