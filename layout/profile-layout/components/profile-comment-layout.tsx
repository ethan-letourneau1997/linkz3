import { ProfileComments } from "./profile-comments";

type ProfilePostLayoutProps = {
  searchParams: {
    page: string;
    sort: "top" | "new" | "old";
  };
  params: {
    username: string;
  };
};
export async function ProfileCommentLayout({
  searchParams,
  params,
}: ProfilePostLayoutProps) {
  return (
    <div className="w-full max-w-3xl">
      <ProfileComments params={params} searchParams={searchParams} />
    </div>
  );
}
