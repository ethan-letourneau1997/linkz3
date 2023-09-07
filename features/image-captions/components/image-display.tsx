import { PostImage } from "@/types";

type ImageDisplayProps = {
  image: PostImage;
};

export function ImageDisplay({ image }: ImageDisplayProps) {
  const divStyle = {
    backgroundImage: `url('${image.url}')`,
    height: "400px",
  };
  // Add any other CSS properties here as needed

  return (
    <div className="flex items-end bg-cover" style={divStyle}>
      {image.caption && (
        <p className="w-full py-2 bg-opacity-75 bg-neutral-800 ">
          {" "}
          {image.caption}{" "}
        </p>
      )}
    </div>
  );
}
