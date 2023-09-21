"use client";

import "keen-slider/keen-slider.min.css";

import { CarouselArrow } from "./carousel-arrow";
import Image from "next/image";
import { PostImage } from "@/types";
import { useKeenSlider } from "keen-slider/react";
import { useState } from "react";

type ImageCarouselProps = {
  postImages: PostImage[];
};

export function ImageCarousel({ postImages }: ImageCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  if (postImages)
    return (
      <>
        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider ">
            {postImages.map((image, index) => (
              <div key={index} className="keen-slider__slide">
                <div className="relative">
                  <Image
                    alt=""
                    src={image.url}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="w-full h-auto rounded dark:opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <CarouselArrow
                left
                onClick={(e: { stopPropagation: () => unknown }) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <CarouselArrow
                onClick={(e: { stopPropagation: () => unknown }) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details.slides.length - 1
                }
              />
            </>
          )}
        </div>

        {loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                />
              );
            })}
          </div>
        )}
      </>
    );
}
