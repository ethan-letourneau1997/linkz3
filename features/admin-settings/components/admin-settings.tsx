import { AdminSpacePreview } from "./admin-space-preview";
import { fetchUserAdminSpaces } from "./fetch-user-admin-spaces";

export async function AdminSettings() {
  const userAdminSpaces = await fetchUserAdminSpaces();

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold ">Admin</h2>
      <p className="text-sm text-neutral-500">Manage your spaces.</p>
      {/* <Separator className="mt-2" /> */}
      <div className="mt-4 space-y-2">
        {userAdminSpaces?.map((space) => (
          <AdminSpacePreview key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}
