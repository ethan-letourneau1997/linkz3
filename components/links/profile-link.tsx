import Link from "next/link";

type ProfileLinkProps = {
  username: string;
  className?: string;
  text: string | null;
};

export function ProfileLink({ username, className, text }: ProfileLinkProps) {
  return (
    <Link
      className={`${className} hover:underline hover:cursor-pointer`}
      href={`/profile/${username}`}
    >
      {text}
    </Link>
  );
}
