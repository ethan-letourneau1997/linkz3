import Image from "next/image";
import { PostImage } from "@/types";

type CaptionImageProps = {
  image: PostImage;
};

export function CaptionImage({ image }: CaptionImageProps) {
  return (
    <div className="relative ">
      <Image
        alt=""
        src={image.url}
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto border rounded dark:opacity-90 dark:border-neutral-600"
      />
    </div>
  );
}
