import { PostImage } from "@/types";

type ImageDisplayProps = {
  image: PostImage;
};

export function ImageDisplay({ image }: ImageDisplayProps) {
  const divStyle = {
    backgroundImage: `url('${image.url}')`,
    height: "300px",
    backgroundSize: "cover",
  };
  // Add any other CSS properties here as needed

  return (
    <div className="flex items-end" style={divStyle}>
      {image.caption && (
        <p className="w-full py-2 bg-opacity-75 bg-contain bg-neutral-800">
          {image.caption}
        </p>
      )}
    </div>
  );
}
