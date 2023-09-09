import { PostPreviews } from "@/features/post-preview/components/post-previews";
import { getSortedSubscriptionPosts } from "../api/get-sorted-subscription-posts";

type SpacePagePostsProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
  };
};

export async function SubscriptionsLayout({ params }: SpacePagePostsProps) {
  const posts = await getSortedSubscriptionPosts(params.page, params.sortBy);

  if (posts)
    return (
      <>
        <PostPreviews posts={posts} />
      </>
    );

  if (!posts) return <div>No posts</div>;
}

// import { SpacePreview } from "@/features/space-preview";
// import { cookies } from "next/headers";
// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// type SubscriptionsLayoutType = {
//   params: {
//     page: string;
//     sortBy: "top" | "new" | "old";
//   };
// };

// export async function SubscriptionsLayout({ params }: SubscriptionsLayoutType) {
//   const supabase = createServerComponentClient({ cookies });

//   const { data } = await supabase.auth.getSession();

//   const { data: user_subscriptions } = await supabase
//     .from("user_community")
//     .select("*, community_id(*)")
//     .eq("user_id", data.session?.user.id);

//   return (
//     <div className="w-full max-w-3xl">
//       <h1 className="mt-5 text-3xl font-medium text-center">
//         My Subscriptions
//       </h1>
//       {user_subscriptions?.map((space) => (
//         <SpacePreview key={space.community_id.id} space={space.community_id} />
//       ))}
//     </div>
//   );
// }
