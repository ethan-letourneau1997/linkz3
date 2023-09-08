import Link from "next/link";

type PostLinkProps = {
  spaceId: number | null;
  spaceName: string;
  postId: string | number;
  text: string | null;
  className?: string;
};

export function PostLink({
  spaceId,
  spaceName,
  className,
  postId,
  text,
}: PostLinkProps) {
  return (
    <Link
      className={`${className} hover:underline hover:cursor-pointer`}
      href={`/spaces/${spaceId}/${spaceName}/post/${postId}`}
    >
      {text}
    </Link>
  );
}
