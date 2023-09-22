import { AiOutlineEdit } from "react-icons/ai";
import Link from "next/link";

type EditPostButtonProps = {
  spaceId: string;
  spaceName: string;
  postId: number | null;
};

export function EditPostButton({
  spaceId,
  spaceName,
  postId,
}: EditPostButtonProps) {
  return (
    <Link
      className="w-full  py-1.5 flex gap-1"
      href={`/spaces/${spaceId}/${spaceName}/edit/${postId}`}
    >
      <AiOutlineEdit className="w-4 h-4 mr-2" />
      Edit
    </Link>
  );
}
