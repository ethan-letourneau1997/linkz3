export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    spaceName: string;
    spaceId: string;
  };
};

export default async function Index({ params }: IndexProps) {
  return <div>{params.spaceName} settings</div>;
}
