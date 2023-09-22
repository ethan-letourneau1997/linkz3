"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { PostImage } from "@/types";

type ImageCarouselProps = {
  postImages: PostImage[];
};

export function ImageCarousel({ postImages }: ImageCarouselProps) {
  if (postImages)
    return (
      <Carousel autoPlay={false} showThumbs={false} swipeable>
        {postImages.map((image, index) => (
          <img
            key={index}
            alt=""
            src={image.url}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded dark:opacity-90"
          />
        ))}
      </Carousel>
    );
}
