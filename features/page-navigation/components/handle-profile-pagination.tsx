"use client";

import { useEffect, useState } from "react";

import { PageNavigation } from "./page-navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";

export function HandleProfilePagination() {
  const params = useParams();

  const activePage = parseInt(params.page as string, 10);
  const supabase = createClientComponentClient();
  const [pageCount, setPageCount] = useState(0);

  async function getUserId() {
    const { data: user } = await supabase
      .from("public_profile")
      .select()
      .eq("username", params.username)
      .single();
    return user.id;
  }

  async function getProfilePostCount() {
    const userId = await getUserId();
    const { count } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("created_by", userId);
    if (count) {
      const pages = Math.ceil(count / 10);
      setPageCount(pages);
    }
  }

  async function getProfileCommentCount() {
    const userId = await getUserId();
    if (userId) {
      const { count } = await supabase
        .from("comment")
        .select("*", { count: "exact", head: true })
        .eq("posted_by", userId);
      if (count) {
        const pages = Math.ceil(count / 10);
        setPageCount(pages);
      }
    }
  }

  useEffect(() => {
    if (params.type === "post") {
      getProfilePostCount();
    }
    if (params.type === "comment") {
      getProfileCommentCount();
    }
  }, [params]);

  return (
    <div className="flex justify-center mt-3">
      <PageNavigation activePage={activePage} pageCount={pageCount} />
    </div>
  );
}
