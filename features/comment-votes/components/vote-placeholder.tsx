import { BiDownvote, BiUpvote } from "react-icons/bi";

export function VotePlaceholer() {
  return (
    <div className="flex flex-col items-center">
      <div className="px-2 py-1 ">
        <BiUpvote className="hover:text-teal-300" />
      </div>
      <div>0</div>
      <div className="px-2 py-1 ">
        <BiDownvote className="hover:text-teal-300" />
      </div>
    </div>
  );
}
