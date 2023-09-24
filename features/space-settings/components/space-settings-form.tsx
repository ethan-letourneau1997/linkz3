import { DisplayNameInput } from "./display-name-input";
import { Space } from "@/types";
import { SpaceAvatar } from "./space-avatar";
import { SpaceDescriptionInput } from "./space-description-input";

type spaceSettingsFormProps = {
  space: Space;
};

export async function SpaceSettingsForm({ space }: spaceSettingsFormProps) {
  return (
    <div className="py-5">
      <SpaceAvatar spaceId={space.id} />

      <div className="space-y-7 ">
        <DisplayNameInput space={space} />
        <SpaceDescriptionInput space={space} />
      </div>
    </div>
  );
}
