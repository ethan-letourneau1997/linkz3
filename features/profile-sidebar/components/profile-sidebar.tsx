"use client";

import { FaCommentAlt } from "react-icons/fa";
import { PiSignpostFill } from "react-icons/pi";
import { PublicProfile } from "@/types";
import { Separator } from "@/components/ui/separator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function ProfileSidebar() {
  const params = useParams();

  const username = params.username;

  const supabase = createClientComponentClient();

  const { data: user } = useSWR("user", async () => {
    try {
      const { data } = await supabase
        .from("public_profile")
        .select("*")
        .eq("username", username)
        .single();
      return data;
    } catch (e) {
      console.log(e);
    }
  });

  console.log(user);

  if (user)
    return (
      <div className="px-4 pb-3 space-y-3 w-72">
        <h2 className="text-lg font-semibold text-center">{username}</h2>
        <p className="text-sm text-center">{user?.biography}</p>
        <Separator />

        <div className="grid grid-cols-2">
          <UserPostCount user={user} />
          <UserCommentCount user={user} />
        </div>
      </div>
    );
}

type UserPostCountProps = {
  user: PublicProfile;
};

export function UserPostCount({ user }: UserPostCountProps) {
  const supabase = createClientComponentClient();

  const { data: postCount } = useSWR("postCount", async () => {
    try {
      const { count } = await supabase
        .from("post")
        .select("*", { count: "exact", head: true })
        .eq("created_by", user.id);

      return count;
    } catch (e) {
      console.log(e);
    }
  });

  if (postCount)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-2 text-neutral-300">
          <PiSignpostFill />
          <span>{postCount || 0}</span>
        </div>
        <div className="text-sm text-neutral-500">
          post{postCount === 1 ? "" : "s"}
        </div>
      </div>
    );
}

type UserCommentCountProps = {
  user: PublicProfile;
};

export function UserCommentCount({ user }: UserCommentCountProps) {
  const supabase = createClientComponentClient();

  const { data: commentCount } = useSWR("commentCount", async () => {
    try {
      const { count } = await supabase
        .from("comment")
        .select("*", { count: "exact", head: true })
        .eq("posted_by", user.id);

      return count;
    } catch (e) {
      console.log(e);
    }
  });

  if (commentCount)
    return (
      <div className="flex flex-col items-center justify-center ">
        <div className="flex items-center gap-2 text-neutral-300">
          <FaCommentAlt />
          <span>{commentCount || 0}</span>
        </div>
        <div className="text-sm text-neutral-500">
          comment{commentCount === 1 ? "" : "s"}
        </div>
      </div>
    );
}
