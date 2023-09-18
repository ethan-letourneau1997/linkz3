import { ProfilePosts } from "./profile-posts";

type ProfilePostLayoutProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
  params: {
    username: string;
  };
};
export async function ProfilePostLayout({
  searchParams,
  params,
}: ProfilePostLayoutProps) {
  return (
    <div className="w-full max-w-3xl">
      <ProfilePosts params={params} searchParams={searchParams} />
    </div>
  );
}
