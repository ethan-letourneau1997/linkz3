type SpaceLayoutProps = {
  spaceName: string;
};

export async function SpaceLayout({ spaceName }: SpaceLayoutProps) {
  return <div className="mt-5">hello {spaceName}</div>;
}
