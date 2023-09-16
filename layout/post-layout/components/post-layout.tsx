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
    <Card className="w-full max-w-3xl px-2 mt-5 border-0md:border dark:bg-dark-900">
      <Post params={params} />

      <Separator className="mt-5 mb-5" />

      <Comments params={params} />
    </Card>
  );
}
