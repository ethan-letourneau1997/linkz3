import { Card } from "@/components/ui/card";
import { FaUserAstronaut } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import Link from "next/link";
import { Space } from "@/types";
import { fetchSpaceSubscriberCount } from "@/lib/space/fetch-space-subscriber-count";
import { fetchUserAdminSpaces } from "./fetch-user-admin-spaces";

export async function AdminSettings() {
  const userAdminSpaces = await fetchUserAdminSpaces();

  return (
    <div>
      <h2 className="text-xl font-semibold ">Admin</h2>
      <div className="grid grid-cols-2 gap-2">
        {userAdminSpaces?.map((space) => (
          <AdminSpace key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}

type AdminSpaceProps = {
  space: Space;
};

export async function AdminSpace({ space }: AdminSpaceProps) {
  const subscriberCount = await fetchSpaceSubscriberCount(space.id);
  return (
    <Card className="p-2 ">
      <div className="flex items-center justify-between">
        {space.name}
        <Link href={`/spaces/${space.id}/${space.name}/settings`}>
          <IoSettingsSharp className="hover:text-indigo-500" />
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <FaUserAstronaut />
        {subscriberCount}
      </div>
    </Card>
  );
}
