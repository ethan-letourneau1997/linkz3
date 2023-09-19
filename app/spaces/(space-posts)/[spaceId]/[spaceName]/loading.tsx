import { PreviewSkeleton } from "@/features/post-preview";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <PreviewSkeleton count={10} />;
}
