"use client";

import "keen-slider/keen-slider.min.css";

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
                <img
                  className="max-w-full max-h-[400px] object-cover mx-auto"
                  src={image.url}
                  alt=""
                />
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: { stopPropagation: () => unknown }) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />

              <Arrow
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

function Arrow(props: {
  disabled: boolean;
  left?: boolean;
  onClick: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}) {
  const disabeld = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
