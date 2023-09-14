import { Card } from "@/components/ui/card";
import { Comments } from "@/features/comments";
import { Post } from "@/features/post";
import { PostRouterParams } from "@/types";
import { Separator } from "@/components/ui/separator";

type PostLayoutProps = {
  params: PostRouterParams;
};

export async function PostLayout({ params }: PostLayoutProps) {
  return (
    <Card className="w-full max-w-3xl mt-5 border-0 dark:bg-neutral-950 md:border">
      <Post params={params} />
      <div className="px-5">
        <Separator />
      </div>
      <Comments params={params} />
    </Card>
  );
}
