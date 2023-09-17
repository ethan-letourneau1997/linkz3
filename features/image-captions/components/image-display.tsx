import Image from "next/image";
import { PostImage } from "@/types";

type ImageDisplayProps = {
  image: PostImage;
};

export function ImageDisplay({ image }: ImageDisplayProps) {
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
