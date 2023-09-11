import { ImageCaptions } from "@/features/image-captions";
import { PostRouterParams } from "@/types";

export const dynamic = "force-dynamic";

type IndexProps = {
  params: PostRouterParams;
};

export default async function Index({ params }: IndexProps) {
  return <ImageCaptions params={params} />;
}
