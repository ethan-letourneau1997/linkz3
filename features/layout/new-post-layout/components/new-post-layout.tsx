import { NewPostForm } from "@/features/new-post-form";
import { SpaceRouterParams } from "@/types";

type NewPostLayoutProps = {
  params: SpaceRouterParams;
};

export function NewPostLayout({ params }: NewPostLayoutProps) {
  return <NewPostForm params={params} />;
}
