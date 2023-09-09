"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Pagination } from "flowbite-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function ProfilePagination() {
  const params = useParams();
  const router = useRouter();

  const activePage = parseInt(params.page as string, 10);
  const supabase = createClientComponentClient();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    async function getPostCount() {
      if (params.type === "post") {
        const { data: user } = await supabase
          .from("public_profile")
          .select()
          .eq("username", params.username)
          .single();

        if (user) {
          const { count } = await supabase
            .from("post")
            .select("*", { count: "exact", head: true })
            .eq("created_by", user.id);
          if (count) {
            const pages = Math.ceil(count / 10);
            setPageCount(pages);
          }
        }
      }
      if (params.type === "comment") {
        const { data: user } = await supabase
          .from("public_profile")
          .select()
          .eq("username", params.username)
          .single();

        if (user) {
          const { count } = await supabase
            .from("comment")
            .select("*", { count: "exact", head: true })
            .eq("posted_by", user.id);
          if (count) {
            const pages = Math.ceil(count / 10);
            setPageCount(pages);
          }
        }
      }
    }
    getPostCount();
  }, [params]);

  return (
    <div className="flex justify-center mt-3">
      <Pagination
        currentPage={activePage}
        onPageChange={(page) => {
          router.push(`${page}`);
        }}
        totalPages={pageCount}
      />
    </div>
  );
}
