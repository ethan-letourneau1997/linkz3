import { SpaceDetails } from "./space-details";
import { Suspense } from "react";

type SpaceProps = {
  spaceName: string;
};

export async function Space({ spaceName }: SpaceProps) {
  return (
    <div className="mt-5">
      <div className="text-2xl font-medium text-center">{spaceName}</div>
      <Suspense fallback={<div>Loading...</div>}>
        <SpaceDetails spaceName={spaceName} />
      </Suspense>
    </div>
  );
}
