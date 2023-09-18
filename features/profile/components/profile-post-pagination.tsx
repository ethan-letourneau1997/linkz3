"use client";

import { useParams, useSearchParams } from "next/navigation";

import { PageNavigation } from "../../page-navigation/components/page-navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

export function ProfilePostPagination() {
  const searchParams = useSearchParams();
  const params = useParams();

  const page = searchParams.get("page");
  const activePage = page ? parseInt(page, 10) : 1;

  const supabase = createClientComponentClient();

  const { data: pageCount } = useSWR("public_profile", async () => {
    const { data: user } = await supabase
      .from("public_profile")
      .select()
      .eq("username", params.username)
      .single();

    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("created_by", user.id);
    if (count) {
      const pages = Math.ceil(count / 10);
      return pages;
    }
  });

  if (page && pageCount)
    return (
      <div className="flex justify-center mt-3">
        <PageNavigation activePage={activePage} pageCount={pageCount} />
      </div>
    );
}
