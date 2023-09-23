import { FaUserAstronaut } from "react-icons/fa";

type SidebarSubscriberCountProps = {
  count: number;
};

export function SidebarSubscriberCount({ count }: SidebarSubscriberCountProps) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex items-center gap-2">
        <FaUserAstronaut className="text-sm" />
        <span className="text-sm">{count || 0}</span>
      </div>
      <div className="text-xs text-neutral-500">
        subscriber{count === 1 ? "" : "s"}
      </div>
    </div>
  );
}
