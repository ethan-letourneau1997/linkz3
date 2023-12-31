import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: {
    username: string;
  };
};

export default async function Index({ params }: IndexProps) {
  redirect(`/profile/${params.username}/comments/new/1`);
}
