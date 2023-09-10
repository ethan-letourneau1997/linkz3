"use client";

import { useEffect, useState } from "react";

import { PageNavigation } from "./page-navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export function HandleSpacePagination() {
  const params = useParams();

  const activePage = parseInt(params.page as string, 10);
  const supabase = createClientComponentClient();
  const [pageCount, setPageCount] = useState(0);

  async function getPostCount() {
    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("posted_in", params.spaceId);
    if (count) {
      const pages = Math.ceil(count / 10);
      setPageCount(pages);
    }
  }

  useEffect(() => {
    getPostCount();
  }, [params]);

  return (
    <div className="flex justify-center mt-3">
      <PageNavigation activePage={activePage} pageCount={pageCount} />
    </div>
  );
}
