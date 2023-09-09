import { ProfileComments } from "./profile-comments";
import { ProfilePosts } from "./profile-posts";

type ProfileLayoutProps = {
  params: {
    page: string;
    sortBy: "top" | "new" | "old";
    username: string;
    type: "post" | "comment";
  };
};
export async function ProfileLayout({ params }: ProfileLayoutProps) {
  return (
    <div className="w-full max-w-3xl">
      {params.type === "post" && params.username && (
        <ProfilePosts params={params} />
      )}
      {params.type === "comment" && params.username && (
        <ProfileComments params={params} />
      )}

      {/* <ProfileTabs
        posts={}
        comments={<ProfileComments username={params.username} />}
      /> */}
      {/* <ProfilePosts username={username} /> */}
    </div>
  );
}
