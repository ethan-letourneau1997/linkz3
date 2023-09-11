"use client";

import { UserSpace } from "@/types";

type UserSpacesProps = {
  subscriptions: UserSpace[];
};
export function UserSpaces({ subscriptions }: UserSpacesProps) {
  return (
    <div>
      <p>My Spaces</p>
      {subscriptions?.map((space) => (
        <div key={space.community_id.id}>{space.community_id.name}</div>
      ))}
    </div>
  );
}
