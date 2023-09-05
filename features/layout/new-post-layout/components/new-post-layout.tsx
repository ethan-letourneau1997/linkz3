import { NewPostForm } from "@/features/new-post-form";
import { NewPostRouterParams } from "../types";

type NewPostLayoutProps = {
  params: NewPostRouterParams;
};

export function NewPostLayout({ params }: NewPostLayoutProps) {
  return <NewPostForm params={params} />;
}
