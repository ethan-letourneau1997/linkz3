import Link from "next/link";
import { PostRouterParams } from "@/types";

type ImageEditorHeaderProps = {
  params: PostRouterParams;
};

export async function ImageEditorHeader({ params }: ImageEditorHeaderProps) {
  return (
    <div className="w-full max-w-2xl mt-5 text-center">
      <>
        <h1 className="text-2xl font-semibold tracking-tight scroll-m-20 ">
          Change an image caption and click save!
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Edit image captions. When you&apos;re done, return to the&nbsp;
          <Link
            className="text-blue-500 hover:cursor-pointer"
            href={`/spaces/${params.spaceId}/${params.spaceName}/post/${params.postId}`}
          >
            post
          </Link>
          .
        </p>
      </>
    </div>
  );
}
