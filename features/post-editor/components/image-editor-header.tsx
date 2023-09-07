import Link from "next/link";
import { PostRouterParams } from "@/types";

type ImageEditorHeaderProps = {
  params: PostRouterParams;
};

export async function ImageEditorHeader({ params }: ImageEditorHeaderProps) {
  return (
    <div className="w-full max-w-2xl mt-5 text-center">
      <>
        <h2 className="text-xl font-semibold ">
          Change an image caption and click save!
        </h2>
        <div className="mt-1 text-sm">
          when you&apos;re done,&nbsp;
          <Link
            className="text-blue-500 hover:cursor-pointer"
            href={`/spaces/${params.spaceId}/${params.spaceName}/post/${params.postId}`}
          >
            return to post
          </Link>
        </div>
      </>
    </div>
  );
}
