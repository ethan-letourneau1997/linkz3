import { BackButton } from "@/components/back-button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SpaceSettingsForm } from "./space-settings-form";
import { fetchSpaceByName } from "@/lib/space/fetch-space-by-name";

type SpaceSettingsProps = {
  spaceName: string;
};

export async function SpaceSettings({ spaceName }: SpaceSettingsProps) {
  const space = await fetchSpaceByName(spaceName);
  return (
    <>
      <Card className="px-5 py-2 mt-5">
        <BackButton />
        <p className="mt-5 dark:text-neutral-500">settings</p>
        <h1 className="text-3xl font-semibold dark:text-neutral-3 200">
          {space.display_name}
        </h1>
        <Separator className="mt-2 dark:bg-neutral-500" />
        <SpaceSettingsForm space={space} />
      </Card>
    </>
  );
}
