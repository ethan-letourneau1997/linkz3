"use client";

type PageButtonsProps = {
  count: number;
};

export function PageButtons({ count }: PageButtonsProps) {
  return (
    <div>
      <p>hello page total pages {count}.</p>
    </div>
  );
}
