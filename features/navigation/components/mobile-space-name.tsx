"use client";

import { useParams } from "next/navigation";

export function MobileSpaceName() {
  const params = useParams();
  if (params.spaceName)
    return <div className="text-lg font-semibold">{params.spaceName}</div>;
}
