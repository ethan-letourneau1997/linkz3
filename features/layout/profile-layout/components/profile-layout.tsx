import { ProfileComments } from "./profile-comments";
import { ProfilePosts } from "./profile-posts";
import { ProfileTabs } from "./profile-tabs";

type ProfileLayoutProps = {
  username: string;
};
export async function ProfileLayout({ username }: ProfileLayoutProps) {
  return (
    <div className="w-full max-w-3xl">
      <h1 className="mt-5 text-3xl font-bold text-center">{username}</h1>
      <ProfileTabs
        posts={<ProfilePosts username={username} />}
        comments={<ProfileComments username={username} />}
      />
      {/* <ProfilePosts username={username} /> */}
    </div>
  );
}
