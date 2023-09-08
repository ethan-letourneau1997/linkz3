import Link from "next/link";

type SpaceLinkProps = {
  spaceId: number;
  spaceName: string;
  text: string | null;
  className?: string;
};

export function SpaceLink({
  spaceId,
  spaceName,
  className,
  text,
}: SpaceLinkProps) {
  return (
    <Link
      className={`${className} hover:underline hover:cursor-pointer`}
      href={`/spaces/${spaceId}/${spaceName}`}
    >
      {text}
    </Link>
  );
}
