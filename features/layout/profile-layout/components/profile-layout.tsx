type ProfileLayoutProps = {
  username: string;
};
export async function ProfileLayout({ username }: ProfileLayoutProps) {
  return (
    <>
      <div className="mt-5 text-3xl font-bold">{username}</div>
    </>
  );
}
