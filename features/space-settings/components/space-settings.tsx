import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BackButton } from "@/components/back-button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SpaceAvatarUModal } from "./space-avatar-modal";
import { SpaceDescriptionInput } from "./space-description-input";
import { fetchSpaceAvatar } from "@/lib/space/fetch-space-avatar";
import { fetchSpaceByName } from "@/lib/space/fetch-space-by-name";

type SpaceSettingsProps = {
  spaceName: string;
};

export async function SpaceSettings({ spaceName }: SpaceSettingsProps) {
  return (
    <>
      <Card className="px-5 py-2 mt-5">
        <BackButton />

        <p className="mt-5 dark:text-neutral-500">settings</p>
        <h1 className="text-3xl font-semibold dark:text-neutral-3 200">
          {spaceName}
        </h1>

        <Separator className="mt-2 dark:bg-neutral-500" />
        <SpaceSettingsForm spaceName={spaceName} />
      </Card>
    </>
  );
}

type spaceSettingsFormProps = {
  spaceName: string;
};

export async function SpaceSettingsForm({ spaceName }: spaceSettingsFormProps) {
  const space = await fetchSpaceByName(spaceName);
  return (
    <div className="space-y-5 mt-7">
      <div className="flex gap-3 ">
        <div className="flex justify-end w-20 pt-0.5">
          <Label className="flex-none ml-1 ">Avatar</Label>
        </div>

        <SpaceAvatar spaceId={space.id} />
      </div>
      <div className="relative space-y-8 -top-6">
        <div className="flex gap-3 ">
          <div className="flex justify-end w-20 pt-0.5">
            <Label className="flex-none ml-1">Name</Label>
          </div>
          <Input
            disabled
            className="max-w-sm ml-1 dark:bg-dark-700"
            value={space.name}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex justify-end w-20 pt-0.5">
            <Label className="flex-none ml-1">Space #</Label>
          </div>
          <Input
            disabled
            className="max-w-sm ml-1 dark:bg-dark-700"
            value={space.id}
          />
        </div>
        <SpaceDescriptionInput space={space} />
      </div>
      {/* <div className="flex gap-3 ">
        <div className="flex justify-end w-20 pt-0.5">
          <Label className="flex-none ml-1 ">Description</Label>
        </div>

        <Textarea
          className="max-w-sm ml-1 dark:bg-dark-700"
          value={space.description}
        />
      </div> */}
    </div>
  );
}

type SpaceAvatarProps = {
  spaceId: number;
};

export async function SpaceAvatar({ spaceId }: SpaceAvatarProps) {
  const spaceAvater = await fetchSpaceAvatar(spaceId);

  return (
    <div className="ml-2">
      {spaceAvater ? (
        <Avatar className="w-20 h-20 ">
          <AvatarImage src={spaceAvater.path} alt="@shadcn" />
          <AvatarFallback>{spaceId}</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-20 h-20 rounded-sm ">
          <AvatarImage src={``} alt="@shadcn" />
          <AvatarFallback>{spaceId}</AvatarFallback>
        </Avatar>
      )}
      <SpaceAvatarUModal spaceId={spaceId} spaceAvatar={spaceAvater} />
    </div>
  );
}
