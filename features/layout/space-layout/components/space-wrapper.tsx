"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Pagination } from "flowbite-react";
import { Space } from "@/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type SpaceWrapperProps = {
  children: React.ReactNode;
};

export function SpaceWrapper({ children }: SpaceWrapperProps) {
  const params = useParams();
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [spaceDetails, setSpaceDetails] = useState<Space>();

  const activePage = parseInt(params.page as string, 10);

  useEffect(() => {
    async function getSpaceDetails() {
      const { data: space } = await supabase
        .from("community")
        .select()
        .eq("id", params.spaceId)
        .single();

      setSpaceDetails(space);
    }

    getSpaceDetails();
  }, [params]);

  return (
    <div>
      <div>{spaceDetails?.name}</div>
      <div>{spaceDetails?.description}</div>
      {children}
      <Pagination
        currentPage={activePage}
        onPageChange={(page) => {
          router.push(`${page}`);
        }}
        totalPages={100}
      />
    </div>
  );
}
