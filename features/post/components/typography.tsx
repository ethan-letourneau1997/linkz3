import React from "react";

type TitleProps = {
  as: "h1" | "h2" | "h3" | "h4";
  size: "h1" | "h2" | "h3" | "h4";
  text: string;
};

export function Title({ as, size, text }: TitleProps) {
  let className = "tracking-tight scroll-m-20";

  switch (size) {
    case "h1":
      className += " text-4xl font-extrabold lg:text-5xl";
      break;
    case "h2":
      className +=
        " border-b pb-2 text-3xl font-semibold transition-colors first:mt-0";
      break;
    case "h3":
      className += " text-2xl font-semibold";
      break;
    case "h4":
      className += " text-xl font-semibold";
      break;
    default:
      break;
  }

  return React.createElement(as, { className }, text);
}

export function Paragraph() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
}
